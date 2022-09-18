import "./styles/main.css";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "./assets/logo_nlw_sports.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { Form } from "./components/Form";

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
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

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-full max-w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
            <Form />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
