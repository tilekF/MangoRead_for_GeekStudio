import React from "react";
import '../../../assets/css/footer.css'
import img from "../../../assets/header/Logo.svg";
import facebook from "../../../assets/Socials/Facebook.svg";
import instagram from "../../../assets/Socials/Instagram.svg";
import twitter from "../../../assets/Socials/Twitter.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_first">
          <ul className="footer_blocks">
            <li>
              <ul className="footer_blocks_footLog">
                <li>
                  <img src={img} alt="img" />
                </li>
                <li>
                  <h2>MangoRead</h2>
                  <p>Читай мангу с нами</p>
                </li>
              </ul>
            </li>
            <li>
              <ul className="footer_links">
                <li className="footer_links_item">
                  <img src={facebook} alt="" />
                  <p>Facebook</p>   
                </li>
                <li className="footer_links_item">
                  <img src={instagram} alt="" />
                  <p>Instagram</p>
                </li>
                <li className="footer_links_item">
                  <img src={twitter} alt="" />
                  <p>Twitter</p>
                </li>
              </ul>
            </li>
            <li>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1929.3868377380666!2d74.61676610094476!3d42.87919867424221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7baf3e2d3f9%3A0x588977f3a213b3b3!2z0JrRg9GA0YHRiyDQv9GA0L7Qs9GA0LDQvNC80LjRgNC-0LLQsNC90LjRjyDQkdC40YjQutC10LogR2Vla3M!5e0!3m2!1sru!2skg!4v1681376951728!5m2!1sru!2skg" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </li>
          </ul>
        </div>
        <div className="footer_second">
          <ul className="footer_second_blocks">
            <li>©2022, All right reserved.</li>
            <li className="footer_second_blocks_under">Privacy Policy</li>
            <li className="footer_second_blocks_under">Terms of Service</li>
            <li className="footer_second_blocks_under">Cookies Settings</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
