import React, { useContext } from "react";
import '../../assets/css/card.css'
import { CustomContext } from "../../utils/context";
import TextTruncate from "react-text-truncate";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MakeAdd } from "../../store/reducers/data";

const Card = ({ products }) => {
  const dispatch = useDispatch();
  const { endIndex, startIndex } = useContext(CustomContext);

  return (
    <div className="card">
      {products.data.slice(startIndex, endIndex).map((product) => (
        <Link
          onClick={() => dispatch(MakeAdd("makeOrder", product))}
          to={`/Info`}
          className="card_block"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 5.73%, rgba(0, 0, 0, 0.5) 66.15%),url(${product.image})center, no-repeat`,
          }}
          key={product.id}
        >
          <div className="card_block_text">
            <h2>Год: {product.issue_year}</h2>
            <TextTruncate
              className="card_block_title"
              line={2.5}
              text={product.ru_name}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
