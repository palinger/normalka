import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import Button from "@mui/material/Button";

const StateButton = () => {
  const [done, setDone] = useState(true);

  const handleClick = () => {
    setDone(!done);
    console.log("done", done);
  };

  return (
    <>
      {done ? (
        <Button
          variant="outlined"
          onClick={handleClick}
          startIcon={<PendingIcon />}
          sx={{ mt: 2 }}
        >
          Vybavit
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={handleClick}
          startIcon={<CheckCircleIcon />}
          sx={{ mt: 2 }}
          color="success"
        >
          Vybavené
        </Button>
      )}
    </>
  );
};

export default StateButton;
