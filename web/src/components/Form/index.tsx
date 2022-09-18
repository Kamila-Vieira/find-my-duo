import { Close } from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";
import { Check, GameController } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SelectGame } from "./SelectGame";
import { Input } from "./Input";
import { daysOfWeek } from "./mocks";

export interface PublishAdProps {
  useVoiceChannel: boolean;
  weekDays: string[];
  name: string;
  discord: string;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
  gameId: string;
}

export function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PublishAdProps>({ reValidateMode: "onChange" });
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [gameId, setGameId] = useState("");

  const onSubmit: SubmitHandler<PublishAdProps> = async (data) => {
    if (!gameId) return;

    const { name, discord, yearsPlaying, hourStart, hourEnd } = data;

    try {
      await axios.post(`http://localhost:3333/games/${gameId}/ads`, {
        useVoiceChannel,
        name,
        discord,
        hourStart,
        hourEnd,
        weekDays: weekDays.map(Number),
        yearsPlaying: Number(yearsPlaying),
      });
      reset({
        name: "",
        discord: "",
        yearsPlaying: 0,
        hourStart: "",
        hourEnd: "",
      });
      setUseVoiceChannel(false);
      setWeekDays([]);
      console.log("Anúncio criado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <SelectGame setGameId={setGameId} />

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-semibold">
          Seu nome (ou nickname)
        </label>

        <Input
          register={register}
          registerName="name"
          registerProps={{
            required: true,
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              setValue("name", event.target.value);
            },
          }}
          style={
            errors?.name && {
              border: "1px solid red",
            }
          }
          id="name"
          placeholder="Como te chamam dentro do game?"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 md:flex md:flex-col md:gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="yearsPlaying" className="font-semibold">
            Joga há quantos anos?
          </label>
          <Input
            register={register}
            registerName="yearsPlaying"
            registerProps={{
              required: true,
            }}
            style={
              errors?.yearsPlaying && {
                border: "1px solid red",
              }
            }
            id="yearsPlaying"
            type="number"
            min={0}
            placeholder="Tudo bem ser ZERO"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="discord" className="font-semibold">
            Qual seu Discord?
          </label>
          <Input
            register={register}
            registerName="discord"
            registerProps={{
              required: true,
              pattern: /#+\d{4}$/,
              validate: (discord: string) => {
                if (!/#+\d{4}$/.test(discord)) {
                  return "Insira um usuário de discord válido";
                }
              },
              onChange: (event: ChangeEvent<HTMLInputElement>) => {
                setValue("discord", event.target.value);
              },
            }}
            style={
              errors?.discord && {
                border: "1px solid red",
              }
            }
            id="discord"
            type="text"
            placeholder="Usuario#0000"
          />
        </div>
      </div>

      <div className="flex gap-6 md:flex-col md:gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="weekDays" className="font-semibold">
            Quando costuma jogar?
          </label>

          <ToggleGroup.Root
            onValueChange={setWeekDays}
            type="multiple"
            className="flex gap-1 flex-wrap max-w-[216px] md:max-w-full"
          >
            {daysOfWeek.map(({ char, title }, index) => (
              <ToggleGroup.Item
                value={String(index)}
                key={title}
                className={`w-10 h-11 rounded sm:w-9 ${
                  weekDays.includes(String(index)) ? "bg-violet-500" : "bg-zinc-900"
                }`}
                title={title}
              >
                {char}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="hourStart" className="font-semibold">
            Qual horário do dia?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              register={register}
              registerName="hourStart"
              registerProps={{
                required: true,
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  setValue("hourStart", event.target.value);
                },
              }}
              style={
                errors?.hourStart && {
                  border: "1px solid red",
                }
              }
              id="hourStart"
              type="time"
              placeholder="De"
            />
            <Input
              register={register}
              registerName="hourEnd"
              registerProps={{
                required: true,
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  setValue("hourEnd", event.target.value);
                },
              }}
              style={
                errors?.hourEnd && {
                  border: "1px solid red",
                }
              }
              id="hourEnd"
              type="time"
              placeholder="Até"
            />
          </div>
        </div>
      </div>

      <label className="mt-2 flex gap-2 text-sm items-center">
        <Checkbox.Root
          value={undefined}
          checked={useVoiceChannel}
          onCheckedChange={(value) => {
            if (typeof value === "boolean") {
              setUseVoiceChannel(value);
            }
          }}
          defaultChecked={false}
          id="useVoiceChannel"
          className="w-6 h-6 p-1 rounded bg-zinc-600"
        >
          <Checkbox.Indicator>
            <Check className="w-4 h-4 text-emerald-400" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Costumo me conectar ao chat de voz
      </label>

      <footer className="mt-4 flex justify-end gap-4">
        <Close
          type="button"
          className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors sm:text-sm"
        >
          Cancelar
        </Close>
        <button
          type="submit"
          className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition-colors sm:text-sm sm:gap-1"
        >
          <GameController className="w-6 h-6" /> Encontrar duo
        </button>
      </footer>
    </form>
  );
}
