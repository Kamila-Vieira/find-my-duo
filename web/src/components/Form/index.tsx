import { Close } from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./Input";

export function Form() {
  return (
    <form className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="game" className="font-semibold">
          Qual o game?
        </label>
        <Input id="game" placeholder="Selecione o game que deseja jogar" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-semibold">
          Seu nome (ou nickname)
        </label>
        <Input id="name" type="text" placeholder="Como te chamam dentro do game?" />
      </div>

      <div className="grid grid-cols-2 gap-6 md:flex md:flex-col md:gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="yearsPlaying" className="font-semibold">
            Joga há quantos anos?
          </label>
          <Input id="yearsPlaying" type="text" placeholder="Tudo bem ser ZERO" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="discord" className="font-semibold">
            Qual seu Discord?
          </label>
          <Input id="discord" type="text" placeholder="Usuario#0000" />
        </div>
      </div>

      <div className="flex gap-6 md:flex-col md:gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="weekDays" className="font-semibold">
            Quando costuma jogar?
          </label>

          <div className="flex gap-1 flex-wrap max-w-[216px] md:max-w-full">
            <button type="button" className="w-10 h-11 rounded bg-zinc-900 sm:w-9" title="Domingo">
              D
            </button>
            <button type="button" className="w-10 h-11 rounded bg-zinc-900 sm:w-9" title="Segunda">
              S
            </button>
            <button type="button" className="w-10 h-11 rounded bg-zinc-900 sm:w-9" title="Terça">
              T
            </button>
            <button type="button" className="w-10 h-11 rounded bg-zinc-900 sm:w-9" title="Quarta">
              Q
            </button>
            <button type="button" className="w-10 h-11 rounded bg-zinc-900 sm:w-9" title="Quinta">
              Q
            </button>
            <button type="button" className="w-10 h-11 rounded bg-zinc-900 sm:w-9" title="Sexta">
              S
            </button>
            <button type="button" className="w-10 h-11 rounded bg-zinc-900 sm:w-9" title="Sábado">
              S
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="hourStart" className="font-semibold">
            Qual horário do dia?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input id="hourStart" type="date" placeholder="De" />
            <Input id="hourEnd" type="date" placeholder="Até" />
          </div>
        </div>
      </div>

      <div className="mt-2 flex gap-2 text-sm">
        <input id="useVoiceChannel" type="checkbox" />
        Costumo me conectar ao chat de voz
      </div>

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
