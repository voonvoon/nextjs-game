import { FC } from "react";
import heroClassNames from "./heroClassName";
import Link from "next/link";
import Image from "next/image";

const HeroSection: FC<{ showLink?: boolean }> = (props) => {
  const { showLink } = props;

  return (
    <section className={heroClassNames.hero}>
      <div className={heroClassNames.grid}>
        <div className={heroClassNames.content}>
          <h1 className={heroClassNames.heading}>Fire Distinguisher</h1>
          <h1 className={heroClassNames.ctaText}>Douse Every Flame.. 🧯</h1>
          <p className={heroClassNames.paragraph}>
            Extinguish the flames with our revolutionary products
          </p>
          {showLink && (
            <div className="mt-8 sm:mt-10 rounded">
              <Link href="#recent-games" className={heroClassNames.button}>
                Find Products
              </Link>
            </div>
          )}
        </div>
        <div className={heroClassNames.imageContainer}>
          <Image
            src="https://images.unsplash.com/photo-1649836215936-41c76a724233?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="3D Game Development"
            className={heroClassNames.image}
            width={400}
            height={400}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
