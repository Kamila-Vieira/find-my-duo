import "./styles/main.css";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import logoImg from "./assets/logo_nlw_sports.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";

export interface GameProps {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

//TODO: V2 => Adicionar responsividade
//TODO: V2 => Adicionar carousel na listagem de games https://keen-slider.io/
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
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20 lg:px-4">
      <img src={logoImg} alt="Logo NLW Sports" />

      <h1 className="text-6xl text-white font-black">
        Seu <span className="bg-duo-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(({ id, title, bannerUrl, _count: { ads } }) => {
          return <GameBanner key={id} bannerUrl={bannerUrl} title={title} adsCount={ads} />;
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
