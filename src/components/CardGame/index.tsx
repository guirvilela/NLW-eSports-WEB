import React from "react";

interface ICardGame {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

const CardGame: React.FC<ICardGame> = ({ bannerUrl, adsCount, title }) => {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt={title} className="rounded-lg" />
      <div className="bg-nlw-gradient-card  w-full pt-16 pb-4 px-4 absolute bottom-0 left-0  right-0 rounded-b-lg">
        <strong className="text-white font-bold block ">{title}</strong>
        <span className="text-zinc-300 text-sm ">
          {adsCount} {adsCount === 1 ? "anúncio" : "anúncios"}
        </span>
      </div>
    </a>
  );
};

export default CardGame;
