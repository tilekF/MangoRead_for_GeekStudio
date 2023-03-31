import React, { useContext } from "react";
import { CustomContext } from "../../utils/context";
import TextTruncate from "react-text-truncate";

const Card = ({ products }) => {
  const { endIndex, startIndex } = useContext(CustomContext);

  return (
    <div className="card">
      {products.data.slice(startIndex, endIndex).map((product) => (
        <div
          className="card__block"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 5.73%, rgba(0, 0, 0, 0.5) 66.15%),url(${product.image})center, no-repeat`,
          }}
          key={product.id}
        >
          <div className="card__block-text">
            <h2>Год: {product.issue_year}</h2>
            <TextTruncate
              className="card__block-title"
              line={3}
              text={product.ru_name}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
