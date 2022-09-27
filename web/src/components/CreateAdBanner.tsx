import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-duo-gradient self-stretch rounded-lg mt-8 overflow-hidden max-w-[1200px] mx-auto w-full">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center md:flex-col md:items-start md:gap-6">
        <div>
          <strong className="text-2xl text-white font-black block sm:text-lg">
            Não encontrou seu duo
          </strong>
          <span className="text-zinc-400 block sm:text-sm">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition-colors flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
