import github from "../../images/github.png";
import linkedIn from "../../images/linkedIn.png";
import HTML from "../../images/HTML.png";
import CSS from "../../images/CSS.png";
import google from "../../images/google.png";
import aws from "../../images/aws.png";
import react from "../../images/react.png";
import rails from "../../images/rails.png";
import ruby from "../../images/ruby.png";
import js from "../../images/javascript.png";
import portfolio from "../../images/portfolio.png";
import PostgreSQL from "../../images/postgresql.png";
import "./Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div id="backToTop" onClick={scrollToTop}>
        <h1 id="backToTopContent">Back to Top</h1>
      </div>
      <div id="splashFooter">
        <br />
        <span>
          <div id="devloperInfo">Developer: Shaun Jhingoor</div>
          <br />
          <div id="personalLink">
            <a
              href="https://github.com/ShaunJhingoor"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="GitHub Logo" id="myLinks" />
            </a>
            <a
              href="https://www.linkedin.com/in/shaun-jhingoor-10a50328a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedIn} alt="linkedin Logo" id="myLinks" />
            </a>
            <a
              href="https://shaun-jhingoor-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={portfolio} alt="linkedin Logo" id="myLinks" />
            </a>
          </div>
          <br />
          <div id="technologiesUsedHeader">Technologies Implemented:</div>
          <br />
          <div id="technlogiesUsed">
            <br />
            <div id="technology">
              <img src={HTML} alt="html" />
              <p>HTML</p>
            </div>
            <div id="technology">
              <img src={CSS} alt="CSS" />
              <p>CSS</p>
            </div>
            <div id="technology">
              <img src={google} alt="CSS" />
              <p>Google API</p>
            </div>
            <div id="technology">
              <img src={aws} alt="CSS" />
              <p>AWS S3</p>
            </div>
            <div id="technology">
              <img src={react} alt="CSS" />
              <p>React</p>
            </div>
            <div id="technology">
              <img src={rails} alt="CSS" />
              <p>Rails</p>
            </div>
            <div id="technology">
              <img src={PostgreSQL} alt="CSS" />
              <p>PostgreSQL</p>
            </div>
            <div id="technology">
              <img src={ruby} alt="CSS" />
              <p>Ruby</p>
            </div>
            <div id="technology">
              <img src={js} alt="CSS" />
              <p>JavaScript</p>
            </div>
          </div>
        </span>
      </div>
    </>
  );
}
export default Footer;
