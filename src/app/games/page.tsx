import HeroSection from "@/components/HeroSection/HeroSection";
import GameCard from "@/components/GameCard/GameCard";

import { getGames } from "@/libs/apis";

const Games = async (props: {}) => {
  const games = await getGames();

  return (
    <div>
      <HeroSection />

      <section className={classNames.section}>
        <h2 className={classNames.heading}> Products</h2>
        <p className={classNames.subHeading}>
          Checkout our latest collection of products
        </p>

        <div className="flex rounded gap-8 flex-wrap py-10">
          {games.map((game) => (
            <GameCard
              key={game._id}
              gameName={game.name}
              imageUrl={game.images[0].url}
              price={game.price}
              slug={game.slug.current}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Games;

const classNames = {
  section: "py-16 lg:pb-36 px-4 lg:px-36 text-white text-center",
  heading: "text-3xl lg:text-4xl font-bold mb-3",
  subHeading: "text-gray-400 max-w-xl lg:text-lg",
};
