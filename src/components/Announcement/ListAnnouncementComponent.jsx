import React, { useEffect, useState } from 'react'
import './Announcement.css'
import { Fab, Alert, Card, CardHeader, Stack, CardContent, Typography, IconButton, AlertTitle, Button, DialogTitle, DialogContent, DialogContentText, Dialog} from '@mui/material'
import { deleteAnnouncement, getAllAnnouncement } from '../../services/AnnouncementService'
import RecommendIcon from '@mui/icons-material/Recommend';
import AddIcon from '@mui/icons-material/Add';
import AnnouncementForm from './AnnouncementForm';
import CloseIcon from '@mui/icons-material/Close';
import { isAdminUser } from '../../services/AuthService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditAnnouncementForm from './EditAnnouncementForm';



const ListAnnouncementComponent = () => {
  const [announcements, setAnnouncements] = useState([])
  const [color, setColor] = useState("default");
  const [open, setOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [selectedAnnouncementForEdit, setSelectedAnnouncementForEdit] = useState([])
  const isAdmin = isAdminUser();
  const btnStyle = { marginTop: 10, marginLeft: 150 }
  const cardStyle = {marginBottom: 25, width:'96%', backgroundColor: "rgba(229, 226, 226, 0.545)"}
  
  //FUNCTION TO HANDLE THE LIKE BUTTON FOR EACH CARD
  const handleColor = () => {
      if (color === "default") {
          setColor("primary");
      }
      else if (color === "primary") {
          setColor("default");
      }
  }

  useEffect(() => {
    announcementList();
  }, [])

  //FUNCTION TO DISPLAY ANNOUNCEMENT LIST FROM GET ALL ANNOUNCEMENT API
  function announcementList() {
    getAllAnnouncement().then((response) => {
      setAnnouncements(response.data);
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  //THIS FUNCTION IS TO HANDLE THE ADD ANNOUNCEMENT BUTTON
  function handleAddAnnouncement() {
    console.log("ADD ANNOUNCEMENT BUTTON IS CLICKED.");
    setOpen(true)
  }

  function handleEditAnnouncement(announcement) {
    console.log("EDIT ANNOUNCEMENT BUTTON IS CLICKED.")
    setSelectedAnnouncementForEdit(announcement)
    setEditFormOpen(true)
  }

  function handleDeleteAnnouncement(id) {
    console.log("Delete button is clicked. " + id);
    deleteAnnouncement(id).then((response) => {
      console.log(response.data)
      alert("Successfully deleted announcement.")
      window.location.reload(true)
    }).catch(err => {
      console.log(err)
      alert("An error occured while trying to delete announcement. Please contact admin.")
      window.location.reload(true)
    })
  }




  
  //THIS FUNCTION IS TO HANDLE THE RENDERING OF ANNOUNCEMENTS IN THE HOME PAGE
  function renderAnnouncements() {
    if (announcements.length === 0) {
      console.log("GET ALL ANNOUNCEMENTS IS EMPTY.");
      return (
        <Alert severity="info" style={{ backgroundColor: "rgba(229, 226, 226, 0.545)", marginTop: "50px", width: "96%"}}>
          <AlertTitle>Info</AlertTitle>
          <strong className="announcement-alert">THERE ARE NO ANNOUNCEMENTS AT THIS TIME.</strong>
        </Alert>
      );
    } else {
      console.log("GET ALL ANNOUNCEMENTS IS NOT EMPTY.")
      return <div className='mui-card'>
        <h2 style={{marginBottom: "50px"}}>Latest Announcements</h2>
        {
            announcements.map(announcement =>
              <Card key={announcement.id} style={cardStyle}>
                <CardHeader
                  title = {announcement.title}
                  subheader = {announcement.description}
                  // action = {
                  //   <IconButton onClick={handleColor}>
                  //     <RecommendIcon color={color} />
                  //   </IconButton>
                  // }
                ></CardHeader>
                <CardContent>
                  <Typography variant='body1'>
                    Announcement Date:<br></br>
                    {announcement.reportedDate}
                  </Typography>
                  <br></br>
                  <Typography variant='body1'>
                    Announced by:<br></br>
                    {announcement.reporter}
                  </Typography>
                  {
                    isAdmin && <Fab
                    color="error" 
                    aria-label="delete"
                    style={{ transform: 'scale(0.7)' }}
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    >
                        <DeleteIcon/>
                    </Fab>
                  }
                  {
                    isAdmin && <Fab
                    onClick={() => handleEditAnnouncement(announcement)}
                    color="secondary" 
                    aria-label="edit"
                    style={{ transform: 'scale(0.7)' }}
                    >
                        <EditIcon/>
                    </Fab>
                  }
                </CardContent>
              </Card>
              
            )
          }
      </div>
    } 
  }
  return (
    <div className='AnnouncementComponent'>
      {/* <Stack spacing={2}>
        <Alert severity="info" onClose={() => {close}}>This is sample.</Alert>
      </Stack> */}
      <br></br><br></br>
      {
        isAdmin &&
        <Button onClick={handleAddAnnouncement} variant="contained" color= 'success' startIcon={<AddIcon />}>
        Add Announcement
        </Button>
      }
      {
        renderAnnouncements()
      }
        <Dialog 
        open={open}
        onClose = {() => setOpen(false)}
        >
          <Button 
          color='primary'
          onClick={() => setOpen(false)}
          style={{marginLeft: "235px"}}
          >
            <CloseIcon/>
          </Button>
          <DialogTitle>ADD ANNOUNCEMENT</DialogTitle>
          <DialogContent dividers>
            <AnnouncementForm/>
          </DialogContent>
        </Dialog>

        <Dialog 
        open={editFormOpen}
        onClose = {() => setEditFormOpen(false)}
        >
          <Button 
          color='primary'
          onClick={() => setEditFormOpen(false)}
          style={{marginLeft: "235px"}}
          >
            <CloseIcon/>
          </Button>
          <DialogTitle>EDIT ANNOUNCEMENT</DialogTitle>
          <DialogContent dividers>
            <EditAnnouncementForm
            pId = {selectedAnnouncementForEdit.id}
            pTitle = {selectedAnnouncementForEdit.title}
            pDetails = {selectedAnnouncementForEdit.description}
            />
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default ListAnnouncementComponent