import * as Select from "@radix-ui/react-select";
import axios from "axios";
import { CaretUp, CaretDown, Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { GameProps } from "../../../App";

interface SelectGameProps {
  setGameId: (gameId: string) => void;
}

export function SelectGame({ setGameId }: SelectGameProps) {
  const [games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Select.Root name="gameId" onValueChange={setGameId}>
      <div className="flex flex-col gap-2">
        <label htmlFor="gameId" className="font-semibold">
          Qual o game?
        </label>
        <Select.Trigger className="bg-zinc-900 h-11 py-2 px-4 rounded text-sm text-zinc-500 flex justify-between items-center">
          <Select.Value id="gameId" placeholder="Selecione o game que deseja jogar" />
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
      </div>
    </Select.Root>
  );
}
