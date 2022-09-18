import { Close } from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";
import { CaretUp, CaretDown, Check, GameController } from "phosphor-react";
import { Input } from "./Input";
import { GameProps } from "../../App";
import { daysOfWeek } from "./mocks";
import { FormEvent, useState } from "react";

interface FormProps {
  games: GameProps[];
}
export function Form({ games }: FormProps) {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  async function handleCreateAd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    //TODO: V2 => Adicionar validação de campos https://react-hook-form.com/

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        useVoiceChannel,
        weekDays: weekDays.map(Number),
        name: data.name,
        discord: data.discord,
        yearsPlaying: Number(data.yearsPlaying),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
      });
      console.log("Anúncio criado com sucesso");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="mt-8 flex flex-col gap-4" onSubmit={handleCreateAd}>
      <div className="flex flex-col gap-2">
        <label htmlFor="game" className="font-semibold">
          Qual o game?
        </label>
        <Select.Root name="game">
          <Select.Trigger className="bg-zinc-900 h-11 py-2 px-4 rounded text-sm text-zinc-500 flex justify-between items-center">
            <Select.Value id="game" placeholder="Selecione o game que deseja jogar" />
            <CaretDown size={15} />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content>
              <Select.ScrollUpButton>
                <CaretUp size={12} className="text-white" />
              </Select.ScrollUpButton>
              <Select.Viewport className="bg-zinc-700 w-full p-2 rounded">
                <Select.Group>
                  {games.map(({ id, title }) => (
                    <Select.Item
                      key={id}
                      value={id}
                      className="flex items-center gap-1 py-2 px-4 text-white text-sm relative cursor-pointer"
                    >
                      <Select.ItemIndicator className="absolute left-0 w-2">
                        <Check size={12} />
                      </Select.ItemIndicator>
                      <Select.ItemText>{title}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton>
                <CaretDown size={12} className="text-white" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-semibold">
          Seu nome (ou nickname)
        </label>
        <Input id="name" name="name" type="text" placeholder="Como te chamam dentro do game?" />
      </div>

      <div className="grid grid-cols-2 gap-6 md:flex md:flex-col md:gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="yearsPlaying" className="font-semibold">
            Joga há quantos anos?
          </label>
          <Input
            id="yearsPlaying"
            name="yearsPlaying"
            type="number"
            min={0}
            placeholder="Tudo bem ser ZERO"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="discord" className="font-semibold">
            Qual seu Discord?
          </label>
          <Input id="discord" name="discord" type="text" placeholder="Usuario#0000" />
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
            <Input id="hourStart" name="hourStart" type="time" placeholder="De" />
            <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" />
          </div>
        </div>
      </div>

      <label className="mt-2 flex gap-2 text-sm items-center">
        <Checkbox.Root
          onCheckedChange={(value) => {
            if (typeof value === "boolean") {
              setUseVoiceChannel(value);
            }
          }}
          checked={useVoiceChannel}
          defaultChecked={false}
          id="useVoiceChannel"
          name="useVoiceChannel"
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
