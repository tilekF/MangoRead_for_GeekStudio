import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CustomContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState({ data: [], error: "" });
  const [profile, setProfile] = useState({ data: [], error: "" });
  const [genre, setGenre] = useState("");
  const maxItemsToShow = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const startIndex = (currentPage - 1) * maxItemsToShow;
  const endIndex = startIndex + maxItemsToShow;
  const [searchQuery, setSearchQuery] = useState("");
  const [checkboxes, setCheckboxes] = useState({});
  const [registrate, setRegistrate] = useState("log");

  const getProducts = () => {
    axios(
      `http://134.122.75.14:8666/api/v1/manga?type=${genre}&search=${searchQuery}`
    )
      .then(({ data }) => setProducts({ ...products, data: data }))
      .catch((error) => setProducts({ ...products, error: error }));
  };

  const getProfile = () => {
    axios(`http://134.122.75.14:8666/api/auth/profile/`)
      .then(({ data }) => setProfile({ ...profile, data: data }))
      .catch((error) => setProfile({ ...profile, error: error }));
  };

  useEffect(() => {
    getProducts();
  }, [searchQuery]);

  useEffect(() => {
    getProfile()
  },[])
  const changeGenre = (value) => {
    setGenre(value);
    setCheckboxes({ ...checkboxes, [value]: !checkboxes[value] });
  };

  const selectedCheckboxes = Object.entries(checkboxes)
    .filter(([key, value]) => value)
    .map(([key]) => key)
    .join(",");

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < products.data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const value = {
    getProfile,
    setRegistrate,
    setProfile,
    setCheckboxes,
    setSearchQuery,
    handleNextPage,
    handlePrevPage,
    setCurrentPage,
    changeGenre,
    setProducts,
    setPage,
    setGenre,
    getProducts,
    profile,
    checkboxes,
    registrate,
    searchQuery,
    startIndex,
    maxItemsToShow,
    currentPage,
    endIndex,
    page,
    products,
    genre,
  };

  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};

export default Context;
//http://134.122.75.14:8666/api/v1/manga
