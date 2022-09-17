import { Input } from "../Form/Input";
import FoundDuo from "../FoundDuo";
import { Check, GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { IGame } from "../../@types/type_games";
import { FormEvent, useState } from "react";
import { weekDays } from "../../services/weekDays";
import { Options } from "./Options";
import { api } from "../../server/api";

interface CreateModalProps {
  games: IGame[];
}

export const CreateAddModal = ({ games }: CreateModalProps) => {
  const [weekDaysPlay, setWeekDaysPlay] = useState<string[]>();
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  const handleCreateNewAdd = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    const dataForm = {
      ...data,
      yearsPlaying: Number(data.yearsPlaying),
      weekDays: weekDaysPlay?.map(Number),
      useVoiceChannel: useVoiceChannel,
    };

    console.log(dataForm);

    try {
      const response = await api.post(`/games/${data.gameId}/ads`, dataForm);

      console.log(response);
      alert("Anúncio criado com sucesso");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Dialog.Root>
      <FoundDuo />

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed">
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>
            <form
              onSubmit={handleCreateNewAdd}
              className="mt-8 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Qual o Game?
                </label>

                <select
                  id="game"
                  name="gameId"
                  className="bg-zinc-900 py-3 px-4 rounded text-sm appearance-none "
                >
                  <option value="" defaultValue="" selected disabled>
                    Selecione o game que deseja jogar
                  </option>

                  {games.map(({ id, title }) => (
                    <option key={id} value={id}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="yourName" className="font-semibold">
                  Seu nome (ou nickname)
                </label>
                <Input
                  id="yourName"
                  name="name"
                  type="text"
                  placeholder="Como te chamam dentro do game?"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <section className="flex flex-col gap-2">
                  <label htmlFor="yearPlaying" className="font-semibold">
                    Joga há quanto anos?
                  </label>
                  <Input
                    id="yearPlaying"
                    name="yearsPlaying"
                    type="text"
                    placeholder="Tudo bem ser ZERO"
                  />
                </section>
                <section className="flex flex-col gap-2">
                  <label htmlFor="discord" className="font-semibold">
                    Qual seu Discord?
                  </label>
                  <Input
                    name="discord"
                    id="discord"
                    type="text"
                    placeholder="Usuario#0000"
                  />
                </section>
              </div>

              <div className="flex gap-6">
                <section className="flex flex-col gap-2">
                  <label htmlFor="weekDays" className="font-semibold">
                    Quando costuma jogar?
                  </label>

                  <ToggleGroup.Root
                    type="multiple"
                    className="grid grid-cols-4 gap-2"
                    onValueChange={setWeekDaysPlay}
                    value={weekDaysPlay}
                  >
                    {weekDays.map(({ day }, index) => (
                      <Options
                        key={index}
                        weekDays={weekDaysPlay}
                        index={String(index)}
                        day={day}
                      />
                    ))}
                  </ToggleGroup.Root>
                </section>

                <section className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart" className="font-semibold">
                    Qual horário do dia?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      name="hourStart"
                      id="hourStart"
                      type="time"
                      placeholder="De"
                    />
                    <Input
                      name="hourEnd"
                      id="hourEnd"
                      type="time"
                      placeholder="Até"
                    />
                  </div>
                </section>
              </div>

              <label className="mt-2 flex gap-2 text-sm items-center">
                <Checkbox.Root
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                  onClick={() => setUseVoiceChannel((prev) => !prev)}
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <h2>Costumo me conectar ao chat de voz</h2>
              </label>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="flex items-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600"
                >
                  <GameController size={24} /> Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
