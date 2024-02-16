import "./Footer.css";

export default function Footer() {
  return (
    <div className="Footer">
      <div className="fbox">
        <div className="rme">
          <h2>Send us a message</h2>
          <br></br>
          <input
            className="in1"
            type="email"
            name="email"
            placeholder="Your email"
          ></input>
          <br></br>
          <br></br>
          <textarea
            className="in2"
            type="text"
            name="t1"
            placeholder="Type your message here"
          ></textarea>
          <br></br>
          <br></br>
          <button className="seb">Send</button>
        </div>

        <div className="lme">
          <h2>Get Help</h2>

          <div className="im1">
            <img src="./Symbles/phone.png" />
            <h3>+9477-123-456-78</h3>
          </div>
          <div className="im2">
            <img src="./Symbles/gmail.png" />
            <h3>dreamlearnacademy@gmail.com</h3>
          </div>
        </div>
        <div className="line"></div>

        <div className="fdown">
          <div className="li">
            <h4>@ 2024 DreamLearnAcademy.lk</h4>
          </div>
          <div className="logo3">
            <a href="">
              <img src="./Symbles/link.png" />
            </a>
            <a href="">
              <img src="./Symbles/facebook.png" />
            </a>
            <a href="">
              <img src="./Symbles/whatsapp.png" />
            </a>
            <a href="">
              <img src="./Symbles/youtube.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
