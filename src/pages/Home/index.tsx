import React from "react";
import Typography from "@mui/material/Typography";
import DailyMeal from "../../Components/DailyMeal";
import SubHeader from "../../Layout/SubHeader";
import { dayMap } from "../../helpers/dayMap";

interface Home {
  data: Day[];
}

export type Day = {
  day: string;
  dayNumber: number;
  mealName: string;
  mealDescription: string;
  soupName: string;
  soupDescription: string;
  mealPrice: number;
  soupPrice: number;
  totalPrice: number;
  visibility: boolean;
};

const Home = ({ data }: Home) => {
  const sortedList = data.sort(
    (first, second) => first.dayNumber - second.dayNumber
  );
  return (
    <div className="App">
      <div id="firebaseui-auth-container"></div>
      {/* {console.log("data at home", data)} */}
      <SubHeader data="12.5. 2022  -  15.5. 2022" />
      {sortedList?.map((day: Day, i: number) =>
        day.visibility ? (
          <div key={i}>
            <Typography variant="subtitle1" gutterBottom component="div">
              {dayMap[day.day]}
            </Typography>
            <DailyMeal
              day={day.day}
              mainHeading={day.mealName}
              mainDescription={day.mealDescription}
              soupHeading={day.soupName}
              soupDescription={day.soupDescription}
              mealPrice={day.mealPrice}
              soupPrice={day.soupPrice}
              totalPrice={day.totalPrice}
            />
          </div>
        ) : null
      )}
    </div>
  );
};

export default Home;
