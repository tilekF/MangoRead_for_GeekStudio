import React, { useContext, useEffect, useState } from "react";
import '../../assets/css/catalog.css'
import Card from "../../components/cards/Card";
import SideBarItem from "../../components/sideBar/sideBarItem";
import { CustomContext } from "../../utils/context";
import arrow from "../../assets/catalog/Arrow.svg";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Catalog = () => {
  const {
    genre,
    getProducts,
    setCurrentPage,
    currentPage,
    products,
  } = useContext(CustomContext);

  const [show, setShow] = useState(true);
  const maxItemsToShow = 12;
  const totalPages = Math.ceil(products.data.length / maxItemsToShow);

  const [mangaChecked, setMangaChecked] = useState(false);
  const [manhwaChecked, setManhwaChecked] = useState(false);
  const [westernComicsChecked, setWesternComicsChecked] = useState(false);
  const [manhuaChecked, setManhuaChecked] = useState(false);

  useEffect(() => {
    getProducts();
  }, [genre, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleMangaChange = (event) => {
    setMangaChecked(event.target.checked);
  };

  const handleManhwaChange = (event) => {
    setManhwaChecked(event.target.checked);
  };

  const handleWesternComicsChange = (event) => {
    setWesternComicsChecked(event.target.checked);
  };

  const handleManhuaChange = (event) => {
    setManhuaChecked(event.target.checked);
  };

  return (
    <section className="catalog">
      <div className="container">
        <div className="catalog_inner">
          <div className="catalog_sideBar">
            <div
              style={{ flexDirection: `${show ? "row" : "column-reverse"}` }}
              f={`${show ? "cool" : "un"}`}
              className="catalog_sideBar_title"
            >
              <h2 className={`${show ? "" : "jarno"}`}>Жанры</h2>
              {show ? (
                <p onClick={() => setShow(!show)}>
                  все
                  <img src={arrow} alt="arrow" />
                </p>
              ) : (
                <p onClick={() => setShow(!show)}>
                  <img
                    style={{
                      rotate: "177deg",
                      width: "12px",
                      height: "24px",
                      marginTop: "0.8px",
                    }}
                    src={arrow}
                    alt="arrow"
                  />
                  Назад
                </p>
              )}
            </div>
            <div className="catalog_sideBar_type">Тип</div>
            <div className="catalog_sideBar_checks">
              <SideBarItem
                value={"Манга"}
                text="Манга"
                checked={mangaChecked}
                onChange={handleMangaChange}
              />
              <SideBarItem
                value={"Манхва"}
                text="Манхва"
                checked={manhwaChecked}
                onChange={handleManhwaChange}
              />
              <SideBarItem
                value={"Западный комикс"}
                text="Комиксы"
                checked={westernComicsChecked}
                onChange={handleWesternComicsChange}
              />
              {show === false && (
                <SideBarItem text="Гендерная интрига" />
              )}
              {show === false && (
                <SideBarItem text="Героическое фентези" />
              )}
              {show === false && (
                <SideBarItem text="Детектив" />
              )}
              {show === false && (
                <SideBarItem text="Дзёсэй" />
              )}
              {show === false && (
                <SideBarItem text="Додзинси" />
              )}
              {show === false && <SideBarItem  text="Драмма" />}
              {show === false && <SideBarItem  text="Игра" />}
              {show === false && <SideBarItem  text="История" />}
              {show === false && <SideBarItem  text="Киберпанк" />}
              {show === false && <SideBarItem text="Кодомо" />}
            </div>
            <div className="catalog_sideBar_year">
              <input type="number" placeholder="От 0" name="" id="" />
              <span>—</span>
              <input type="number" placeholder="До 2023" name="" id="" />
            </div>
            <div className="catalog_sideBar_useBtn">
              
              <input type="button" value="Применить" />
            </div>
          </div>
          <div className="catalog_inner_blocks">
            <Card key={products.id} products={products} />
          </div>
        </div>
        <div className="catalog_selectore">
        <Stack spacing={2}>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
        </Stack>
        </div>
      </div>
  </section>
  );
};

export default Catalog;
