import Typography from "@mui/material/Typography";
import React from "react";
import { StyledFooter } from "./StyledFooter";

function Footer() {
  return (
    <StyledFooter>
      <Typography variant="body1" gutterBottom display="block" component="div">
        Zoznam alergénov (čísla na jedálnom lístku v zátvorkách)
      </Typography>
      <Typography variant="body2" gutterBottom display="block" component="div">
        <ol>
          <li>
            Obilniny obsahujúce lepok (t.j. pšenica, raž, jačmeň, ovos, špalda,
            kamut alebo ich hybridné odrody).
          </li>
          <li>Kôrovce a výrobky z nich.</li>
          <li>Vajcia a výrobky z nich.</li>
          <li>Ryby a výrobky z nich.</li>
          <li>Arašidy a výrobky z nich.</li>
          <li>Sójové zrná a výrobky z nich.</li>
          <li>Mlieko a výrobky z neho.</li>
          <li>
            Orechy, ktorými sú mandle, lieskové orechy, vlašské orechy, kešu,
            pekanové orechy, para orechy, pistácie, makadamové orechy a
            queenslandské orechy a výrobky z nich.
          </li>
          <li>Zeler a výrobky z neho.</li>
          <li>Horčica a výrobky z nej.</li>
          <li>Sezamové semená a výrobky z nich.</li>
          <li>
            Oxid siričitý a siričitany v koncentráciách vyšších ako 10 mg/kg
            alebo 10 mg/l. /konzervanty/
          </li>
          <li>Vlčí bob a výrobky z neho.</li>
          <li>Mäkkýše a výrobky z nich.</li>
        </ol>
      </Typography>
    </StyledFooter>
  );
}

export default Footer;
