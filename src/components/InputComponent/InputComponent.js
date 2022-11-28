import React from 'react'
import TextField from '@mui/material/TextField'

const InputComponent = (props) => {

  const {md = 12,label, value, setValue, type = "text"} = props
  
  return (
    <div style={{width:'100%', margin : '1rem 0'}}>
    {/* <label>{label}</label> */}
    <TextField
      style={{width:'100%'}}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      placeholder={label}
      type={type}
  ></TextField> 
                                                                
    {/* </Col> */}
    </div>
  )
}

export default InputComponent