import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Divider, ownerDocument } from "@mui/material";
import Typography from "@mui/material/Typography";
import { StyledCard } from "./StyledCard";
import { StyledImage } from "./StyledImage";
import { StyledDescription } from "./StyledDescription";
import { StyledPrice } from "./StyledPrice";
import { StyledFlex } from "./StyledFlex";
import { StyledMainIcon } from "./StyledIcons/StyledMainIcon";
import { StyledSoupIcon } from "./StyledIcons/StylesSoupIcon";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import pic from "../../images/normalka-logo.jpeg";
import IconButton from "@mui/material/IconButton";
import OrderModal from "../OrderModal";

interface DailyMeal {
  day: string;
  mainHeading: string;
  mainDescription: string;
  soupHeading: string;
  soupDescription: string;
  mealPrice: number;
  soupPrice: number;
  totalPrice: number;
  foodImageUrl?: string;
}

const DailyMeal = ({
  day,
  mainHeading,
  mainDescription,
  soupHeading,
  soupDescription,
  foodImageUrl,
  mealPrice,
  soupPrice,
  totalPrice,
}: DailyMeal) => {
  const matches = useMediaQuery("(min-width:600px)");

  const [modalState, setModalState] = useState(false);

  const handleClose = () => setModalState(false);
  return (
    <StyledCard>
      {matches && (
        <StyledImage>
          <img
            width="100px"
            src={foodImageUrl ? foodImageUrl : pic}
            alt="tasty meal placeholder"
          />
        </StyledImage>
      )}
      <StyledDescription>
        {soupHeading !== "" ? (
          <StyledFlex>
            <StyledSoupIcon color="primary" />
            <div style={{ flex: 1 }}>
              <Typography variant="subtitle1" component="div">
                {soupHeading}
              </Typography>
              <Typography variant="caption" gutterBottom display="block">
                {soupDescription}
              </Typography>
            </div>
            {soupPrice === 0 ? <span> € {soupPrice}</span> : null}
          </StyledFlex>
        ) : null}
        <Divider />
        {mainHeading !== "" ? (
          <StyledFlex>
            <StyledMainIcon color="primary" />
            <div style={{ flex: 1 }}>
              <Typography variant="subtitle1" component="div" align="justify">
                {mainHeading}
              </Typography>
              <Typography variant="caption" gutterBottom display="block">
                {mainDescription}
              </Typography>
            </div>
            {mealPrice === 0 ? <span> € {mealPrice}</span> : null}
          </StyledFlex>
        ) : null}
      </StyledDescription>
      {totalPrice === 0 ? <StyledPrice> € {totalPrice} </StyledPrice> : null}
      <section
        style={{ display: "flex", minWidth: "50px", alignItems: "center" }}
      >
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={() => setModalState(!modalState)}
        >
          <AddShoppingCartIcon />
        </IconButton>
        <OrderModal
          modalState={modalState}
          closeModal={handleClose}
          day={day}
        />
      </section>
    </StyledCard>
  );
};

export default DailyMeal;
