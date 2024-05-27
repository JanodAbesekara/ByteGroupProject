import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';

export default function BasicGauges({value}) {
  let color;
  
  if (value < 20) {
    color = 'red';
  } else if ( value <= 50) {
    color = 'yellow';
  } else if (value <= 80) {
    color = 'blue';
  }else{
    color = 'green';
  }
  
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
      <Gauge width={100} height={100} value={value} color={color} /> 
    </Stack>
  );
}
