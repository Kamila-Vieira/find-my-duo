import "./styles/main.css";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import logoImg from "./assets/logo_nlw_sports.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { GamesSlider } from "./components/GamesSlider";

export interface GameProps {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

//TODO: V2 => Adicionar login com discord ou twitch

function App() {
  const [games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20 2xl:px-4">
      <img src={logoImg} alt="Logo NLW Sports" />

      <h1 className="text-6xl text-white font-black mt-20 text-center">
        Seu <span className="bg-duo-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <GamesSlider games={games} />

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
