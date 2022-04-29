import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Order, OrderData } from "../../../Components/OrderModal";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
interface HandleTotals {
  orderData: OrderData;
}

const HandleTotals = ({ orderData }: HandleTotals) => {
  let soup: number = 0;
  let main: number = 0;
  let ordersTotal: number = 0;

  orderData.orders.map((order: Order) => {
    soup += order.soupOrder;
    main += order.mealOrder;
    ordersTotal += 1;
  });

  return (
    <Box
      sx={{
        mb: 2,
        mr: 2,
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: blue[600],
        padding: "12px 8px 8px",
        borderRadius: "4px",
      }}
    >
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        alignItems="center"
        display="flex"
        color="white"
      >
        <ReceiptLongIcon style={{ margin: "0 4px" }} color="inherit" />
        {ordersTotal}{" "}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        alignItems="center"
        display="flex"
        color="white"
      >
        <RamenDiningIcon style={{ margin: "0 4px 0 12px" }} color="inherit" />
        {soup}{" "}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        alignItems="center"
        display="flex"
        component="div"
        color="white"
      >
        <DinnerDiningIcon style={{ margin: "0 4px 0 12px" }} color="inherit" />
        {main}{" "}
      </Typography>
    </Box>
  );
};

export default HandleTotals;
