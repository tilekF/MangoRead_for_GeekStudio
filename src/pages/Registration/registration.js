  import React, { useContext, useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import { CustomContext } from "../../utils/context";
  import '../../assets/css/registaration.css';

  const Registration = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const { registration, setRegistration } = useContext(CustomContext);
    const [username, setUsername] = useState("");
    const [nick, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [user, setUser] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();
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
        const data = await response.json();
        setUser(data);
      }
      fetchData();
    }, []);

    useEffect(() => {
      if (user.length > 0) {
        window.location.href = "/";
      }
    }, [user]);

    return (
      <section className="registration">
        <div className="registration_main">
          <div className="registration_content">
            <div className="registration_content">
              <Link to="/">X</Link>
            </div>
            <div className="registration_contentLog">
              <p onClick={() => setRegistration("log")}>Вход</p>
              <p onClick={() => setRegistration("reg")}>Регистрация</p>
            </div>
            {registration === "reg" && (
              <form onSubmit={handleSubmit}>
                <div className="registration_contentImg">
                  {selectedImage && (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="selected"
                    />
                  )}
                  <label>
                    <input
                      type="file"
                      placeholder="Выберите фото"
                      onChange={handleImageChange}
                      required
                    />
                    <span>ДОБАВИТЬ ФОТО</span>
                  </label>
                </div>
                <div className="registration_contentForm">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Nickname"
                    value={nick}
                    onChange={(e) => setNick(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit">Регистрация</button>
                </div>
              </form>
            )}
            {registration === "log" && (
              <form>
                <div
                  style={{ marginTop: "45px" }}
                  className="registration_contentForm"
                >
                  <input
                    type="text"
                    placeholder="Username"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
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

  export default Registration;
