import React, { useEffect, useState } from "react";
import left from "../../assets/btnSelectors/left.svg";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/error/error.jpg";

const Info = ({ products }) => {
  const [user, setData] = useState([]);
  const [coment, setComent] = useState([]);
  const [comentAdd, setComentAdd] = useState(false);
  const [text, setText] = useState("");
  const [nick, setNick] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user[0].username,
          nick: user[0].nick,
          img: user[0].image,
          text,
        }),
      });
      const data = await response.json();
      console.log("Comment added:", data);
      setComentAdd(!comentAdd)
      setUsername("");
      setNick("");
      setText("");
      setImage("")
    } catch (error) {
      console.error("Comment failed:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/comments");
      const coment = await response.json();

      setComent(coment);
    }
    fetchData();
  }, [coment]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/users");
      const user = await response.json();

      setData(user);
    }
    fetchData();
  }, []);

  try {
    const regex = /(<([^>]+)>)/gi;
    const result = products.description.replace(regex, "");
    const imageUrl = products.image.replace("old-url.jpg", "new-url.jpg");
    return (
      <section className="info">
        <div className="container">
          <Link className="info__exit" to="/">
            <img src={left} />
            Назад
          </Link>
          <div className="info__head">
            <img
              src={imageUrl}
              onError={(e) => {
                e.target.src = defaultImage;
              }}
              alt="Title-img"
            />
            <div className="info__head-desc">
              <h3>{products.ru_name}</h3>
              <h2>Информация:</h2>
              <p>
                Тип: <span>{products.type}</span>
              </p>
              <p>
                Год: <span>{products.issue_year}</span>
              </p>
              <p>
                Жанр: <span>{products.genre}</span>
              </p>
            </div>
          </div>
          <div className="info__sinop">
            <h2>Синопсис</h2>
            <p>
              {(products.description = products.description.replace(regex, ""))}
            </p>
          </div>
          <div className="info__comments">
            <div className="info__comments-top">
              <h2>Топ комментарий</h2>
              <button
                onClick={() => setComentAdd(!comentAdd)}
                disabled={user.length === 0}
              >
                {user.length === 0
                  ? "нужно войти для оставления коментария"
                  : "добавить комментарий"}
              </button>
            </div>
            {coment.map((user) => (
              <div key={user.id} className="info__comments-com">
                <img src={user.img} alt="Photo" />
                <div className="info__comments-com_texts">
                  <h2>
                    {user.name}, {user.nick}
                  </h2>
                  <p>{user.text}</p>
                </div>
              </div>
            ))}
            {comentAdd && (
              <div className="info__comments-add">
                <div className="info__comments-add_main">
                  <form
                    id="lock"
                    onSubmit={handleSubmit}
                    className="info__comments-add_content"
                  >
                    <div className="info__comments-add_content-items">
                      <img src={user.map((item) => item.image)} alt="" />
                      <h2>
                        {user.map((user) => (
                          <div key={user.id}>
                            {user.username},<span>{user.nick}</span>
                            <input
                              name="nick"
                              type="hidden"
                              onChange={(e) => setNick(e.target.value)}
                              value={nick}
                            />
                            <input
                              name="username"
                              type="hidden"
                              onChange={(e) => setUsername(e.target.value)}
                              value={username}
                            />
                            <input
                              name="image"
                              type="hidden"
                              onChange={(e) => setImage(e.target.value)}
                              value={image}
                            />
                          </div>
                        ))}
                      </h2>
                    </div>
                    <div className="info__comments-add_content-ash">
                      <textarea
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        name="text"
                        cols="30"
                        rows="10"
                        placeholder="Добавьте комментарий"
                      ></textarea>
                        <button
                        form="lock"
                        type="submit"
                      >
                        Добавить
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    return null;
  }
};

export default Info;
