import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import ASideBar from "../../../Component/ASideBar/ASidebar";
import { styled } from "@mui/material/styles";
import "./Aaddresources.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import axios from "axios";



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

const Aaddresources = () => {
 

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2} sx={{ zIndex: "20" }}>
          <ASideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{ width: "100%", height: "1000px" }}>
            <h1>File upload</h1>
          <form>
              <div className="Resourses">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <div className="pdf">
                      <h3>PDF</h3>
                      <h4 for="subject">Subject</h4>

                      <select
                        name="class"
                        className="select"
                        //onChange={(e) => setSubjectp(e.target.value)}
                      >
                        <option value="">subject</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="English Literature">
                          English Literature
                        </option>
                        <option value="English">English</option>
                        <option value="ICT">ICT</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Combined Mathematics">
                          Combined Mathematics
                        </option>
                        <option value="Physics">Physics</option>
                        <option value="Biology">Biologye</option>
                        <option value="Business Studies">
                          Business Studies
                        </option>
                        <option value="Accounting">Accounting</option>
                        <option value="Economics">Economics</option>
                        <option value="Logic and Scientific Method">
                          Logic and Scientific Method
                        </option>
                        <option value="Political Science">
                          Political Science
                        </option>
                        <option value="Engineering Technology">
                          Engineering Technology
                        </option>
                        <option value="Bio Systems Technology">
                          Bio Systems Technology
                        </option>
                        <option value="Science for Technology">
                          Science for Technology
                        </option>
                      </select>

                      <h5>Discription</h5>
                      <textarea
                        placeholder="Enter some details ..."
                        // onChange={(e) => setdiscriP(e.target.value)}
                      ></textarea>

                      <input
                        type="file"
                        className="chose1"
                        accept="application/pdf"
                        //onChange={(e) => setPDF((prev) => e.target.files[0])}
                        style={{
                          width: "100px",
                          height: "30px",
                          color: "white",
                          backgroundColor: "#2387e8;",
                          border: "none",
                        }}
                      />
                      <BootstrapTooltip
                        title="Upload PDF"
                        placement="bottom"
                        arrow
                      >
                        <button className="uplod1" type="submit">
                          <IoCloudUploadOutline />
                        </button>
                      </BootstrapTooltip>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="video">
                      <h3 style={{}}>Video</h3>
                      <h4 for="subject">Subject</h4>

                      <select
                        name="class"
                        className="select"
                        //  onChange={(e) => setSubjectv(e.target.value)}
                      >
                        <option value="">subject</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="English Literature">
                          English Literature
                        </option>
                        <option value="English">English</option>
                        <option value="ICT">ICT</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Combined Mathematics">
                          Combined Mathematics
                        </option>
                        <option value="Physics">Physics</option>
                        <option value="Biology">Biologye</option>
                        <option value="Business Studies">
                          Business Studies
                        </option>
                        <option value="Accounting">Accounting</option>
                        <option value="Economics">Economics</option>
                        <option value="Logic and Scientific Method">
                          Logic and Scientific Method
                        </option>
                        <option value="Political Science">
                          Political Science
                        </option>
                        <option value="Engineering Technology">
                          Engineering Technology
                        </option>
                        <option value="Bio Systems Technology">
                          Bio Systems Technology
                        </option>
                        <option value="Science for Technology">
                          Science for Technology
                        </option>
                      </select>

                      <h5>Discription</h5>
                      <textarea
                        placeholder="Enter some details ..."
                        //  onChange={(e) => setdiscriV(e.target.value)}
                      ></textarea>

                      <input
                        type="file"
                        className="chose2"
                        accept="video/*"
                        //onChange={(e) => setvideo((prev) => e.target.files[0])}
                        style={{
                          width: "100px",
                          height: "30px",
                          color: "white",
                          backgroundColor: "#2387e8;",
                          border: "none",
                        }}
                      />
                      <BootstrapTooltip
                        title="Upload Video"
                        placement="bottom"
                        arrow
                      >
                        <button className="uplod2" type="submit">
                          <IoCloudUploadOutline />
                        </button>
                      </BootstrapTooltip>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="Adio">
                      <h3>Audio</h3>
                      <h4 for="subject">Subject</h4>

                      <select
                        name="class"
                        className="select"
                        //  onChange={(e) => setSubjecta(e.target.value)}
                      >
                        <option value="">subject</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="English Literature">
                          English Literature
                        </option>
                        <option value="English">English</option>
                        <option value="ICT">ICT</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Combined Mathematics">
                          Combined Mathematics
                        </option>
                        <option value="Physics">Physics</option>
                        <option value="Biology">Biologye</option>
                        <option value="Business Studies">
                          Business Studies
                        </option>
                        <option value="Accounting">Accounting</option>
                        <option value="Economics">Economics</option>
                        <option value="Logic and Scientific Method">
                          Logic and Scientific Method
                        </option>
                        <option value="Political Science">
                          Political Science
                        </option>
                        <option value="Engineering Technology">
                          Engineering Technology
                        </option>
                        <option value="Bio Systems Technology">
                          Bio Systems Technology
                        </option>
                        <option value="Science for Technology">
                          Science for Technology
                        </option>
                      </select>

                      <h5>Discription</h5>
                      <textarea
                        placeholder="Enter some details ..."
                        //  onChange={(e) => setdiscriA(e.target.value)}
                      ></textarea>

                      <input
                        type="file"
                        className="chose3"
                        accept="audio/*"
                        //onChange={(e) => setaudio((prev) => e.target.files[0])}
                        style={{
                          width: "100px",
                          height: "30px",
                        }}
                      />
                      <BootstrapTooltip
                        title="Upload Audio"
                        placement="bottom"
                        arrow
                      >
                        <button className="uplod3" type="submit">
                          <IoCloudUploadOutline />
                        </button>
                      </BootstrapTooltip>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </form>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Aaddresources;
