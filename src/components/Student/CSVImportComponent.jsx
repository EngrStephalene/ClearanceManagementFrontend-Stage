import { Grid, Paper, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import { addAllStudents } from '../../services/StudentService';

const CSVImportComponent = () => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 10 }
    const [file, setFile] = useState();
    const fileReader = new FileReader();
    const [array, setArray] = useState([]);
  
    const handleOnChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleOnSubmit = (e) => {
    console.log("submit button clicked.")
      e.preventDefault();
  
      if (file) {
        fileReader.onload = function (event) {
          const csvOutput = event.target.result;
          csvFileToArray(csvOutput);
        };
  
        fileReader.readAsText(file);

      }
    };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(";");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    
        const array = csvRows.map(i => {
          const values = i.split(";");
          const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
          }, {});
          return obj;
        });
    
        setArray(array);
        addStudents(array);
    };

    const addStudents = (array) => {
      console.log("Inside add students method.")
      console.log(array)
      addAllStudents(array).then((response) => {
        console.log(response)
        alert("Successfully added students.")
        window.location.reload(true)
      }).catch(err => {
        console.log(err)
      })
    }

    const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <Grid>
        <Paper elevation={0} style={paperStyle}>
            <Grid align='center'>
                <form>
                    <input type={"file"} id={"csvFileInput"} accept={".csv"} onChange={handleOnChange} />
                    <Button 
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                    variant="contained" 
                    color="secondary" 
                    style={{marginTop:'25px'}}
                    startIcon={<UploadIcon />}>
                        IMPORT CSV
                    </Button>

                <br />
                </form>
            </Grid>
        </Paper>
    </Grid>
  )
}

export default CSVImportComponent