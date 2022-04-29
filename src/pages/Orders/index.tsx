import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import SubHeader from "../../Layout/SubHeader";
import { dayMap } from "../../helpers/dayMap";
import { db, getOrders } from "../../Firebase/app";
import { Order, OrderData } from "../../Components/OrderModal";
import { StyledCard } from "../EditMeal/StyledCard";
import { orange } from "@mui/material/colors";

import AccountCircle from "@mui/icons-material/AccountCircle";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import NotesIcon from "@mui/icons-material/Notes";
import Box from "@mui/material/Box";

import HandleTotals from "./HandleTotals";
import StateButton from "./StateButton";

const Orders = () => {
  const [data, setData] = useState<OrderData[]>([]);
  React.useEffect(() => {
    const response = async () => {
      try {
        // const res = await getThisWeek(db);
        const res = (await getOrders(db)) as OrderData[];
        setData(res);
      } catch (e) {
        console.log("ERRRORRR: ", e);
      }
    };
    response();
  }, []);

  const sortedList = data.sort(
    (first, second) => first.orders[0].dayOrder - second.orders[0].dayOrder
  );

  return (
    <div className="App">
      <div id="firebaseui-auth-container"></div>
      <SubHeader data="12.5. 2022  -  15.5. 2022" />

      {sortedList?.map((el: OrderData, i: number) => (
        <div key={i}>
          <Typography variant="subtitle1" gutterBottom component="div">
            {dayMap[el.orders[0].day]}
          </Typography>
          <StyledCard sx={{ display: "flex", flexWrap: "wrap" }}>
            <HandleTotals orderData={el} />
            {el.orders?.map((order: Order, i: number) => (
              <Box
                key={i}
                sx={{
                  mb: 2,
                  mr: 2,
                  width: "240px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography
                    variant="subtitle1"
                    alignItems="center"
                    gutterBottom
                    display="flex"
                  >
                    <AccountCircle
                      style={{ margin: "0 4px" }}
                      color="primary"
                    />
                    {order.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    alignItems="center"
                    gutterBottom
                    display="flex"
                  >
                    <RamenDiningIcon style={{ margin: "0 4px 0 12px" }} />
                    Polievka: {order.soupOrder} ks
                  </Typography>
                  <Typography
                    variant="body2"
                    alignItems="center"
                    gutterBottom
                    display="flex"
                  >
                    <DinnerDiningIcon style={{ margin: "0 4px 0 12px" }} />
                    Hl. jedlo: {order.mealOrder} ks
                  </Typography>
                  {order.note && (
                    <Typography
                      variant="body2"
                      alignItems="center"
                      gutterBottom
                      display="flex"
                      color={orange[800]}
                    >
                      <NotesIcon style={{ margin: "0 4px 0 12px" }} />
                      Poznámka: {order.note}
                    </Typography>
                  )}
                </div>
                <StateButton />
              </Box>
            ))}
          </StyledCard>
        </div>
      ))}
    </div>
  );
};

export default Orders;
