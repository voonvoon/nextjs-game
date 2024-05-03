import footerClassNames from "./footerClassNames";
import Link from "next/link";

const Footer = () => {
  const {
    container,
    footer,
    section,
    section1,
    section1Content,
    section1Heading,
    section2,
    sectionLink,
    section2Content,
    section2Heading,
    section2ul,
    section3,
    section3Content,
    section3Heading,
  } = footerClassNames;
  return (
    <footer className={footer}>
      <div className={container}>
        <div className={section}>
          <div className={section1}>
            <h2 className={section1Heading}>ExtinguishMart🧯</h2>
            <p className={section1Content}>
            Extinguish the flames with our revolutionary products
            </p>
          </div>
          <div className={section2}>
            <h2 className={section2Heading}>About us</h2>
            <ul className={section2ul}>
              <li>
                <Link href="/docs/term-of-use" className={sectionLink}>
                  Term Of Use
                </Link>
              </li>
              <li>
                <Link href="/docs/privacy-policy" className={sectionLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/docs/refund-return" className={sectionLink}>
                  Refund & Return
                </Link>
              </li>
            </ul>
          </div>
          <div className={section3}>
            <h2 className={section3Heading}>Contact us</h2>
            <p className={section3Content}>
                Tel:018-3795728
            </p>
            <p className={section3Content}>
                Email:extinguishMart@gmail.com
            </p>
            <p className={section3Content}>
                Menara Simfoni, A-16-12b , jln simfoni2, Balakong, Seri Kembangangan 43300 Selangor Malaysia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
