import React, { useContext, useEffect } from "react";
import { CustomContext } from "../../utils/context";

const Info = () => {
  const { getProducts,products } = useContext(CustomContext);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {products.data.map((product) => (
        <section key={product.id}>
          <h2>{product.ru_name}</h2>
        </section>
      ))}
    </>
  );
};

export default Info;
