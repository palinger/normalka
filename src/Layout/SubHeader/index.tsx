import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { StyledSubHeader } from "../SubHeader/StyledSubHeader";

interface SubHeader {
  data?: string;
}

function SubHeader({ data }: SubHeader) {
  return (
    <StyledSubHeader>
      <Stack direction="row" spacing={1}>
        <Chip icon={<CalendarMonthIcon />} label={data} variant="outlined" />
      </Stack>
    </StyledSubHeader>
  );
}

export default SubHeader;
