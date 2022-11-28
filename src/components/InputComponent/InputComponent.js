
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function BasicTextFields(props) {
  const {md = 12,label, value, setValue, type = "text"} = props

  return (
    <div style={{width:'100%', margin : '1rem 0'}}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        style={{width:'100%'}}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={label}
        type={type}
        id="outlined-basic"
        label={label}
        variant="outlined" />
    </Box>
    </div>
  );
}