import React from "react";
import { db, getNewTest } from "./Firebase/app";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import EditMeal from "./pages/EditMeal";
import Orders from "./pages/Orders";

function App() {
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const response = async () => {
      try {
        // const res = await getThisWeek(db);
        const res = await getNewTest(db);
        setData(res);
      } catch (e) {
        console.log("ERRRORRR: ", e);
      }
    };
    response();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="editMeal" element={<EditMeal />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<Home data={data} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
