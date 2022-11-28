import React from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'




const modalWrapper = {
  overflow:"auto",
  maxHeight:"100vh",
  display:"flex",
};

const modalBlock = {
  position:"relative",
  zIndex:0,
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  margin:"auto",
}

const modalContentStyle ={
  position:"relative",
  background:"#fff",
  boxShadow:24,
  mt:3,
  width:"20rem",
  mb:3,
  borderRadius:"10px",
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    mt:3,
    borderRadius:"10px",

  };

const ModalComponent = (props) => {
  const {children, name, open, setOpen, setItem} = props
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setItem(null)
};

  return (
    <div style={{margin:'1rem 0'}}>
        <Button onClick={handleOpen}>{name}</Button>
        <Modal
          disableScrollLock
          sx={modalWrapper}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box sx={modalBlock}>
              <Box sx={style}>
                  {children}
              </Box>
            </Box>
        </Modal>
    </div>
  )
}

export default ModalComponent