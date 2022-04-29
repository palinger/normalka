import React, { useState } from "react";
import SubHeader from "../../Layout/SubHeader";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import { Divider } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { db, getNewTest } from "../../Firebase/app";
import { doc, setDoc } from "firebase/firestore";
import { dayMap, dayOrder } from "../../helpers/dayMap";

import { StyledCard } from "./StyledCard";
import { StyledFielHolder } from "./StyledFieldHolder";
import { StyledButtonHolder } from "./StyledButtonHolder";
import { StyledSoupIcon } from "../../Components/DailyMeal/StyledIcons/StylesSoupIcon";
import { StyledMainIcon } from "../../Components/DailyMeal/StyledIcons/StyledMainIcon";
import { StyledPriceIcon } from "../../Components/DailyMeal/StyledIcons/StyledPriceIcon";
import { StyledCalendarIcon } from "../../Components/DailyMeal/StyledIcons/StyledCalendarIcon";
import PublishIcon from "@mui/icons-material/Publish";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Day } from "../Home";
import { AnyRecordWithTtl } from "dns";

type FormData = {
  mealName: string;
  mealDescription: string;
  soupName: string;
  soupDescription: string;
  mealPrice: number;
  soupPrice: number;
  totalPrice: number;
  day: string;
  dayNumber: number;
  visibility: boolean;
};

const emptyForm: Day = {
  mealName: "",
  mealDescription: "",
  soupName: "",
  soupDescription: "",
  mealPrice: 0,
  soupPrice: 0,
  totalPrice: 0,
  day: "monday",
  dayNumber: 1,
  visibility: false,
};

function EditMeal() {
  const [day, setDay] = React.useState("monday");
  const [data, setData] = React.useState<any[]>([]);
  const today = data.find(isToday);
  const [formData, setFormData] = useState<Day>(today);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleDayChange = (event: SelectChangeEvent) => {
    const temp = { ...formData, dayNumber: dayOrder[event.target.value] };
    setFormData({ ...temp, day: event.target.value });
    setDay(event.target.value as string);
  };
  const handleVisibilityUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, visibility: e.target.checked });
  };
  const handleClearForm = () => {
    setFormData(emptyForm);
  };
  const handlePublish = () => {
    console.log("writing to db ...");
    const dayRef = doc(db, "newTest", formData.day);
    setDoc(dayRef, formData);
  };
  function isToday(days: Day) {
    return days.day === day;
  }
  React.useEffect(() => {
    const response = async () => {
      try {
        const res = await getNewTest(db);
        setData(res);
      } catch (e) {
        console.log("ERRRORRR: ", e);
      }
    };
    response();
    setFormData(today);
  }, [day]);

  return (
    <>
      <SubHeader data={dayMap[day]} />
      <StyledCard>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            align="justify"
          >
            <Typography
              variant="body2"
              alignItems="center"
              gutterBottom
              display="flex"
              sx={{ mt: 2, mb: 2 }}
            >
              <TipsAndUpdatesIcon style={{ margin: "0 12px" }} />
              Ak nechceš aby sa zobrazovala cena, zadaj ju ako 0
            </Typography>
          </Typography>
          <StyledFielHolder>
            <StyledCalendarIcon color="primary" />
            <Select
              style={{ marginLeft: "8px" }}
              id="day"
              value={formData?.day || ""}
              onChange={handleDayChange}
              label="den"
            >
              <MenuItem value={"monday"}>Pondelok</MenuItem>
              <MenuItem value={"tuesday"}>Utorok</MenuItem>
              <MenuItem value={"wednesday"}>Streda</MenuItem>
              <MenuItem value={"thursday"}>Štvrtok</MenuItem>
              <MenuItem value={"friday"}>Piatok</MenuItem>
              <MenuItem value={"saturday"}>Sobota</MenuItem>
              <MenuItem value={"sunday"}>Nedela</MenuItem>
            </Select>
            <Checkbox
              style={{ marginLeft: "8px" }}
              id="visibility"
              checked={formData?.visibility || false}
              onChange={handleVisibilityUpdate}
              icon={<VisibilityOffIcon />}
              checkedIcon={<VisibilityIcon />}
            />
          </StyledFielHolder>
          <Divider style={{ margin: "12px" }} />
          <StyledFielHolder>
            <StyledMainIcon color="primary" />
            <TextField
              id="mealName"
              label="Uprav Hlavné Jedlo"
              value={formData?.mealName || ""}
              onChange={handleFieldChange}
              multiline
            />
          </StyledFielHolder>
          <StyledFielHolder>
            <StyledMainIcon color="primary" />
            <TextField
              id="mealDescription"
              label="Uprav Popis Hlavného Jedla"
              multiline
              value={formData?.mealDescription || ""}
              onChange={handleFieldChange}
            />
          </StyledFielHolder>
          <StyledFielHolder>
            <StyledPriceIcon color="primary" />
            <TextField
              id="mealPrice"
              type="number"
              label="Uprav Cenu Hlavného Jedla"
              value={formData?.mealPrice || ""}
              onChange={handleFieldChange}
            />
          </StyledFielHolder>
          <Divider style={{ margin: "12px" }} />
          <StyledFielHolder>
            <StyledSoupIcon color="primary" />
            <TextField
              id="soupName"
              label="Uprav Polievku"
              multiline
              value={formData?.soupName || ""}
              onChange={handleFieldChange}
            />
          </StyledFielHolder>
          <StyledFielHolder>
            <StyledSoupIcon color="primary" />
            <TextField
              id="soupDescription"
              label="Uprav Popis Polievky"
              multiline
              value={formData?.soupDescription || ""}
              onChange={handleFieldChange}
            />
          </StyledFielHolder>
          <StyledFielHolder>
            <StyledPriceIcon color="primary" />
            <TextField
              id="soupPrice"
              type="number"
              label="Uprav Cenu Polievky"
              value={formData?.soupPrice || ""}
              onChange={handleFieldChange}
            />
          </StyledFielHolder>
          <Divider style={{ margin: "12px" }} />
          <StyledFielHolder>
            <StyledPriceIcon color="primary" />
            <TextField
              id="totalPrice"
              type="number"
              label="Uprav Dokopy Cenu"
              value={formData?.totalPrice || ""}
              onChange={handleFieldChange}
            />
          </StyledFielHolder>
          <Divider style={{ margin: "12px" }} />
          <StyledButtonHolder>
            <Button
              startIcon={<ClearAllIcon />}
              variant="outlined"
              onClick={handleClearForm}
            >
              Clear All
            </Button>
            <Button
              startIcon={<PublishIcon />}
              variant="contained"
              onClick={handlePublish}
            >
              Publish
            </Button>
          </StyledButtonHolder>
        </Box>
      </StyledCard>
    </>
  );
}

export default EditMeal;
