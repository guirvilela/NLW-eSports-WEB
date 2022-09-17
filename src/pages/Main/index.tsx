import { useEffect, useState } from "react";
import CardGame from "../../components/CardGame";

import Logo from "../../assets/logo.svg";
import { api } from "../../server/api";
import { IGame } from "../../@types/type_games";

import Carousel from "react-grid-carousel";
import { CreateAddModal } from "../../components/CreateAddModal";

export const Main = () => {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    getAllGames();
  }, []);

  const getAllGames = async () => {
    const games = await api.get("/games");
    setGames(games?.data);
  };

  return (
    <div className="lg:max-w-[1344px] md:max-w-5xl sm:max-w-[640px] mx-auto flex flex-col items-center my-20">
      <img src={Logo} alt="Logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui
      </h1>

      <div className="mt-16 ">
        <Carousel cols={6} rows={1} gap={24}>
          {games.map(({ id, title, bannerUrl, _count }) => (
            <Carousel.Item key={id}>
              <CardGame
                title={title}
                adsCount={_count.ads}
                bannerUrl={bannerUrl}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <CreateAddModal games={games} />
    </div>
  );
};
