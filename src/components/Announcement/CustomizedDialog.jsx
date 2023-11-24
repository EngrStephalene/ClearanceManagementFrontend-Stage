import { DialogContent, DialogTitle, Dialog } from '@mui/material'
import React, { useState } from 'react'

export default function CustomizedDialog({children, title}) {
    const [openDialog, setOpen] = useState([])

    function handleClose() {
        setOpen(false)
    }

  return (
    <Dialog
    aria-labelledby="customized-dialog-title" 
    open={open}
    >
        <DialogTitle>ADD ANNOUNCEMENTS</DialogTitle>
        <DialogContent dividers>
            {children}
        </DialogContent>
    </Dialog>
  )
}