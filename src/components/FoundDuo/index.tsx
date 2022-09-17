import React from "react";
import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

const FoundDuo: React.FC = () => {
  return (
    <div className="pt-1.5 mt-8 bg-nlw-gradient  self-stretch rounded-lg overflow-hidden ">
      <div className="bg-[#2A2634] px-8 py-6  flex justify-between items-center ">
        <div>
          <strong className="block text-2xl text-white font-bold">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger className="ml-auto py-3 px-4 bg-violet-500 text-white font-medium rounded hover:bg-violet-600 flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
};

export default FoundDuo;
