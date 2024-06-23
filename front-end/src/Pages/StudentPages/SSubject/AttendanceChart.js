import * as React from "react";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";

export default function BasicGauges({ value }) {
  return (
    <div>
      <div style={{marginLeft:"20px", marginTop:"12px", display:"flex", flexDirection:"row"}}>
    <p style={{ color: "#000080", paddingRight:"5px", paddingTop:"23px" }}>Attendence</p>
    <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 1, md: 3 }}>
      <Gauge sx={{paddingLeft:"5px"}} width={70} height={70} value={value} />
    </Stack>
    </div>
    </div>
  );
}
