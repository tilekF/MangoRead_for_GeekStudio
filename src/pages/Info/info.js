import React, { useEffect, useState } from "react";
import left from "../../assets/btnSelectors/left.svg";
import '../../assets/css/info.css'
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Info = ({ products }) => {
    const [user, setData] = useState([]);
    const [coment, setComent] = useState([]);
    const [comentAdd, setComentAdd] = useState(false);
    const [text, setText] = useState("");
    const [nick, setNick] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const maxItemsToShow = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * maxItemsToShow;
    const endIndex = startIndex + maxItemsToShow;

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            setComentAdd(!comentAdd);
            setUsername("");
            setNick("");
            setText("");
            setImage("");
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

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (endIndex < coment.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    try {
        const regex = /(<([^>]+)>)/gi;
        const imageUrl = products.image.replace();
        return (
            <section className="info">
                <div className="container">
                    <Link className="info_exit" to="/">
                        <img src={left} alt=""/>
                        Назад
                    </Link>
                    <div className="info_head">
                        <div className="info_head_desc">
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
                    <div className="info_sinop">
                        <h2>Синопсис</h2>
                        <p>
                            {(products.description = products.description.replace(regex, ""))}
                        </p>
                    </div>
                      <div className="info_comments">
                        <div className="info_comments_top">
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
                        {coment.slice(startIndex, endIndex).map((user) => (
                          <div key={user.id} className="info_comments_com">
                            <img src={user.img} alt="Photo" />
                            <div className="info_comments_com_texts">
                              <h2>
                                {user.name}, {user.nick}
                              </h2>
                              <p>{user.text}</p>
                            </div>
                          </div>
                        ))}
                        {comentAdd && (
                          <div className="info_comments_add">
                            <div className="info_comments_add_main">
                              <form
                                id="lock"
                                onSubmit={handleSubmit}
                                className="info_comments_add_content"
                              >
                                <div className="info_comments_add_content_items">
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
                                <div className="info_comments_add_content_ash">
                                  <textarea
                                    onChange={(e) => setText(e.target.value)}
                                    value={text}
                                    name="text"
                                    cols="30"
                                    rows="10"
                                    placeholder="Добавьте комментарий"
                                  ></textarea>
                                  <button form="lock" type="submit">
                                    Добавить
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                        <div className="info_comments_paginate">
                          <Stack spacing={12}>
                            <Pagination count={99}/>
                          </Stack>
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
