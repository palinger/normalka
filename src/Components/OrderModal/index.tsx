import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import NotesIcon from "@mui/icons-material/Notes";
import { StyledButtonHolder } from "./StyledModalHolder";

import { dayMap, dayOrder } from "../../helpers/dayMap";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, getOrders } from "../../Firebase/app";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Day } from "../../pages/Home";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

interface OrderModal {
  modalState: boolean;
  closeModal: () => void;
  day: string;
}

export type Order = {
  day: string;
  dayOrder: number;
  name: string;
  soupOrder: number;
  mealOrder: number;
  note: string;
};

const initialOrder: Order = {
  day: "",
  dayOrder: 1,
  name: "",
  soupOrder: 0,
  mealOrder: 0,
  note: "",
};

export type OrderData = {
  orders: Order[];
};

export default function OrderModal({
  modalState,
  closeModal,
  day,
}: OrderModal) {
  const [order, setOrder] = React.useState<Order>(initialOrder);
  const [snackBar, setSnackBar] = React.useState(false);
  const [data, setData] = useState<OrderData[]>([]);
  const handleClose = () => closeModal();

  const handleFieldTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({
      ...order,
      [e.target.id]: e.target.value,
    });
  };

  const handleFieldNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({
      ...order,
      [e.target.id]: parseInt(e.target.value, 10),
    });
  };

  const sendOrder = async () => {
    console.log("writing to db ...");
    const dayRef = doc(db, "orders", day);
    await updateDoc(dayRef, {
      orders: arrayUnion(order),
    });

    setSnackBar(true);
  };

  const handleCloseSnackBar = () => {
    setSnackBar(false);
  };

  React.useEffect(() => {
    const dayInfo = {
      day: day,
      dayOrder: dayOrder[day],
    };

    setOrder({
      ...order,
      ...dayInfo,
    });

    const response = async () => {
      try {
        const res = (await getOrders(db)) as OrderData[];
        setData(res);
      } catch (e) {
        console.log("ERRRORRR: ", e);
      }
    };
    response();
  }, []);

  console.log("data", data);
  return (
    <div>
      <Modal
        open={modalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <CardContent>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {dayMap[day]}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Napište nám svoje meno a počet jedál, Prípadne pridajte poznámku
              pre šéfkuchára.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "flex-end", mt: 1, mb: 1 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="name"
                label="Meno"
                variant="standard"
                onChange={handleFieldTextChange}
                value={order.name}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end", mt: 1, mb: 1 }}>
              <RamenDiningIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                id="soupOrder"
                type="number"
                label="Polievka"
                variant="standard"
                onChange={handleFieldNumberChange}
                value={order.soupOrder}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                mt: 1,
                mb: 1,
              }}
            >
              <DinnerDiningIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                id="mealOrder"
                type="number"
                label="Hlavné jedlo"
                variant="standard"
                onChange={handleFieldNumberChange}
                value={order.mealOrder}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end", mt: 1, mb: 1 }}>
              <NotesIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="note"
                label="Poznámka"
                variant="standard"
                multiline
                onChange={handleFieldTextChange}
                value={order.note}
              />
            </Box>
            <StyledButtonHolder>
              <Button onClick={sendOrder} variant="contained">
                Objednať
              </Button>
            </StyledButtonHolder>
          </CardContent>
          <Snackbar
            open={snackBar}
            autoHideDuration={3000}
            onClose={handleCloseSnackBar}
          >
            <Alert
              onClose={handleCloseSnackBar}
              severity="success"
              sx={{ width: "100%" }}
            >
              This is a success message!
            </Alert>
          </Snackbar>
        </Card>
      </Modal>
    </div>
  );
}
