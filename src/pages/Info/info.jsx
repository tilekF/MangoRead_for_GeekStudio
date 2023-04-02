import React, { useEffect, useState } from "react";
import left from "../../assets/btnSelectors/left.svg";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/error/error.jpg";

const Info = ({ products }) => {
  const [user, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/comments");
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
            {user.map((user) => (
              <div>
                <h2>{user.text}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    return null;
  }
};

export default Info;
