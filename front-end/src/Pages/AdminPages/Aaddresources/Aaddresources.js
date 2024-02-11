import React from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import ASideBar from "../../../Component/ASideBar/ASidebar";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./Aaddresources.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";


//samithamahedhs@gmail.com 12345678


const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "black",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    fontSize: "12px",
    padding: "8px",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Aaddresources() {
  return (
    <div>
     <Navbar/>
      <Grid container >
        <Grid item md={0.75} sm={1.5} xs={2.2} >
          <ASideBar />
          
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{ width: "100%", height: "1000px" }}>
            <h1>File upload</h1>
            <div className="Resourses">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <div className="pdf" >
                    <h3 >
                      PDF
                    </h3>
                    <h4 for="subject" >Subject</h4>
          
          <select name="class" className="select" style={{}}>
             <option value="">subject</option>
             <option value="Mathematics">Mathematics</option>
             <option value="Science">Science</option>
             <option value="Agriculture">Agriculture</option>
             <option value="English Literature">English Literature</option>
             <option value="English">English</option>
             <option value="ICT">ICT</option>
             <option value="Chemistry">Chemistry</option>
             <option value="Combined Mathematics">Combined Mathematics</option>
             <option value="Physics">Physics</option>
             <option value="Biology">Biologye</option>
             <option value="Business Studies">Business Studies</option>
             <option value="Accounting">Accounting</option>
             <option value="Economics">Economics</option>
             <option value="Logic and Scientific Method">Logic and Scientific Method</option>
             <option value="Political Science">Political Science</option>
             <option value="Engineering Technology">Engineering Technology</option>
             <option value="Bio Systems Technology">Bio Systems Technology</option>
             <option value="Science for Technology">Science for Technology</option>
          </select>
        
        <h5>Discription</h5>
        <textarea placeholder='Enter some details ...' className="t1"></textarea>


    
        <button className="chose1"
                  style={{
                    
                  }}
                >
                  ChooseFiles
                </button>
                <BootstrapTooltip title="Upload PDF" placement="bottom" arrow>
                <button className="uplod1"
                  style={{
                    
                  }}
                >
                  <IoCloudUploadOutline />
                </button></BootstrapTooltip>
                    
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="video">
                    <h3 style={{}}>
                      Video
                    </h3>
                    <h4 for="subject" >Subject</h4>
          
              <select name="class" className="select" style={{padding:"5px 0px 5px 2px",fontSize:"15px",marginBottom:"20px"}}>
                 <option value="">subject</option>
                 <option value="Mathematics">Mathematics</option>
                 <option value="Science">Science</option>
                 <option value="Agriculture">Agriculture</option>
                 <option value="English Literature">English Literature</option>
                 <option value="English">English</option>
                 <option value="ICT">ICT</option>
                 <option value="Chemistry">Chemistry</option>
                 <option value="Combined Mathematics">Combined Mathematics</option>
                 <option value="Physics">Physics</option>
                 <option value="Biology">Biologye</option>
                 <option value="Business Studies">Business Studies</option>
                 <option value="Accounting">Accounting</option>
                 <option value="Economics">Economics</option>
                 <option value="Logic and Scientific Method">Logic and Scientific Method</option>
                 <option value="Political Science">Political Science</option>
                 <option value="Engineering Technology">Engineering Technology</option>
                 <option value="Bio Systems Technology">Bio Systems Technology</option>
                 <option value="Science for Technology">Science for Technology</option>
              </select>
            
            <h5>Discription</h5>
            <textarea  placeholder='Enter some details ...'></textarea>


        
            <button className="chose2"
                     
                    >
                      ChooseFiles
                    </button>
                    <BootstrapTooltip title="Upload Video" placement="bottom" arrow>
                    <button className="uplod2"
                     
                    >
                      <IoCloudUploadOutline />
                    </button>
                    </BootstrapTooltip>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="Adio">
                    <h3 >
                      Audio
                    </h3>
                    <h4 for="subject" >Subject</h4>
          
          <select name="class" className="select" style={{padding:"5px 0px 5px 2px",fontSize:"15px",marginBottom:"20px"}}>
             <option value="">subject</option>
             <option value="Mathematics">Mathematics</option>
             <option value="Science">Science</option>
             <option value="Agriculture">Agriculture</option>
             <option value="English Literature">English Literature</option>
             <option value="English">English</option>
             <option value="ICT">ICT</option>
             <option value="Chemistry">Chemistry</option>
             <option value="Combined Mathematics">Combined Mathematics</option>
             <option value="Physics">Physics</option>
             <option value="Biology">Biologye</option>
             <option value="Business Studies">Business Studies</option>
             <option value="Accounting">Accounting</option>
             <option value="Economics">Economics</option>
             <option value="Logic and Scientific Method">Logic and Scientific Method</option>
             <option value="Political Science">Political Science</option>
             <option value="Engineering Technology">Engineering Technology</option>
             <option value="Bio Systems Technology">Bio Systems Technology</option>
             <option value="Science for Technology">Science for Technology</option>
          </select>
        
        <h5>Discription</h5>
        <textarea placeholder='Enter some details ...'></textarea>


    
        <button className="chose3"
                  
                >
                  ChooseFiles
                </button>
                <BootstrapTooltip title="Upload Audio" placement="bottom" arrow>
                <button className="uplod3"
                 
                >
                  <IoCloudUploadOutline/>
                </button>
                </BootstrapTooltip>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Aaddresources;
