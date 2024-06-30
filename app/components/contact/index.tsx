import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { TbArrowsDown } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation("contact");
  return (
    <section className="contact-section">
      <div className="contact">
        <div className="contact__texts">
          <h1>{t("contact")}</h1>
          <div className="contact__text">
            <p>{t("info")}</p>
            <TbArrowsDown className="arrows" />
          </div>
          <div className="contact__socials">
            <a
              className="contact__icon"
              href="https://www.linkedin.com/in/tomasz-bi%C5%82ka-bbdev/"
              rel="noreferrer"
              target="_blank"
            >
              <FaLinkedin className="icon icon__linkedin rotate" />
            </a>
            <a
              className="contact__icon"
              href="https://github.com/tomaszbilka"
              rel="noreferrer"
              target="_blank"
            >
              <FaGithub className="icon icon__github rotate" />
            </a>
          </div>
          <div className="contact__text">
            <p>{t("emailMe")}</p>
            <TbArrowsDown className="arrows" />
          </div>
          <div>
            <a href="mailto:tomaszbilka@gmail.com" className="contact__icon">
              <SiGmail className="icon icon__gmail rotate" />
            </a>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__left"></div>
          <div className="footer__right"></div>
        </div>
        <div className="footer__bottom">bbdev &copy; 2024</div>
      </footer>
    </section>
  );
};

export default Contact;
