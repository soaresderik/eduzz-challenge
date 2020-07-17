import React from "react";
import { CardContent } from "@material-ui/core";
import { StyledCard } from "./styles";
import { formatPrice } from "../utils/currency";

interface IProp {
  position: {
    id: string;
    purchaseCryptoPrice: number;
    currentCryptoPrice: number;
    cryptoAmount: number;
    purchaseAmount: number;
    variation: number;
    purchasedDate: string;
  };
}

const PositionCard: React.FC<IProp> = ({ position }) => {
  return (
    <StyledCard>
      <CardContent>
        <p>
          Preço do BTC na compra:{" "}
          <strong>{formatPrice(position.purchaseCryptoPrice / 100)}</strong>
        </p>
        <p>
          Valor comprado:{" "}
          <strong>{formatPrice(position.purchaseAmount / 100)}</strong>
        </p>
        <p>
          Valor em BTC: <strong>{position.cryptoAmount}</strong>
        </p>
        <p>
          Data da compra: <strong>{position.purchasedDate}</strong>
        </p>
      </CardContent>
    </StyledCard>
  );
};

export default PositionCard;
