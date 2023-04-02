import React, { useEffect, useState } from "react";
import left from "../../assets/btnSelectors/left.svg";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/error/error.jpg";

const Info = ({ products }) => {
  const [user, setData] = useState([]);
  const [coment, setComent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/comments");
      const user = await response.json();

      setData(user);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/users");
      const user = await response.json();

      setData(user);
    }
    fetchData();
  }, [user]);

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
              <a>
                Тип: <span>{products.type}</span>
              </a>
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
              <a>добавить комментарий</a>
            </div>
            {user.map((user) => (
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
            <div>
              <div>
                <div>
                  <img src="" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    return null;
  }
};

export default Info;
