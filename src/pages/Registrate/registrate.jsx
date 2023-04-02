import React, { useContext, useEffect, useState } from "react";
import X from "../../assets/registrate/X.svg";
import { Link } from "react-router-dom";
import { CustomContext } from "../../utils/context";

const Registrate = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { registrate, setRegistrate } = useContext(CustomContext);
  const [username, setUsername] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [ user, setData] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsername("");
    setNick("");
    setPassword("");
    setImage("");
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, nick, password, image: imageUrl }),
      });
      const data = await response.json();
      console.log("Registration successful:", data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    setImage(file.name);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/users");
      const user = await response.json();

      setData(user);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (user.length === 1) {
      window.location.href = '/';
    }
  }, [user]);

  return (
    <section className="registrate">
      <div className="registrate__main">
        <div className="registrate__content">
          <div className="registrate__content-x">
            <Link to="/">
              <img src={X} alt="X" />
            </Link>
          </div>
          <div className="registrate__content-log">
            <p onClick={() => setRegistrate("log")}>Вход</p>
            <p onClick={() => setRegistrate("reg")}>Регистрация</p>
          </div>
          {registrate == "reg" && (
            <form onSubmit={handleSubmit}>
              <div className="registrate__content-img">
                {selectedImage && (
                  <img src={URL.createObjectURL(selectedImage)} alt="asasas" />
                )}
                <label>
                  <input
                    type="file"
                    placeholder="Выберите фото"
                    onChange={handleImageChange}
                  />
                  <span>ДОБАВИТЬ ФОТО</span>
                </label>
              </div>
              <div className="registrate__content-form">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Nickname"
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">регистрация</button>
              </div>
            </form>
          )}
          {registrate == "log"&& (
            <form>
              <div
                style={{ marginTop: "45px" }}
                className="registrate__content-form"
              >
                <input
                  type="text"
                  placeholder="Username"
                />
                <input
                  type="password"
                  placeholder="Password"
                />
                <button type="submit">Вход</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Registrate;
