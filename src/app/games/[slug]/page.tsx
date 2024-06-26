"use client";

import GameDetailsClient from "@/components/GameDetails/GameDetailsClient";
import GameDetailsServer from "@/components/GameDetails/GameDetailsServer";


const GameItem = async (props: { params: { slug: string } }) => {
  //   console.log("See See", props);
  const {
    params: { slug },
  } = props;

  return (
   <GameDetailsClient slug={slug}>
      <GameDetailsServer slug={slug}/>
   </GameDetailsClient>
  );
};

export default GameItem;

