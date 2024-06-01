import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import ASideBar from "../../../Component/ASideBar/ASidebar"; // Fix import statement
import axios from "axios";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Rating from "@mui/material/Rating";

function Afeedbackmanager() {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const getFeedbackData = async () => {
      axios
        .get(`/api/auth/feedbackget`)
        .then((response) => {
          console.log(response.data.data);
          setFeedbackData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching feedback data:", error);
        });
    };

    getFeedbackData();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.post(`/api/auth/deletefeedback`, { _id });
      setFeedbackData((prevFeedbackData) =>
        prevFeedbackData.filter((feedback) => feedback._id !== _id)
      );
      window.alert("FeedBack Delete Successfully");
    } catch (error) {
      window.alert( "Error deleting feedback ", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <ASideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            <h1 style={{ textAlign: "center", marginBottom: "100px" }}>
              FeedBack Management
            </h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#0000B9",
                        color: "white",
                        borderRight: "2px solid white",
                        fontSize: "16px",
                      }}
                    >
                      Teacher Email
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#0000B9",
                        color: "white",
                        borderRight: "2px solid white",
                        fontSize: "16px",
                      }}
                    >
                      Student Email
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#0000B9",
                        color: "white",
                        borderRight: "2px solid white",
                        fontSize: "16px",
                      }}
                    >
                      Feedback Text
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#0000B9",
                        color: "white",
                        borderRight: "2px solid white",
                        fontSize: "16px",
                      }}
                    >
                      Star count
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#0000B9",
                        color: "white",
                        borderRight: "2px solid white",
                        fontSize: "16px",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feedbackData.length > 0 ? (
                    feedbackData.map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ textAlign: "center" }}>
                          {row.teacheremail}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {row.studentemail}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {row.feedtext}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <Rating
                            name="simple-controlled"
                            value={row.value}
                            onChange={(event, newValue) => {}}
                            readOnly
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <button
                            style={{
                              color: "white",
                              backgroundColor: "red",
                              border: "none",
                              padding: "5px",
                              boxShadow: "2px 1px 10px 0.5px black",
                              borderRadius: "5px",
                            }}
                            onClick={() => handleDelete(row._id)}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                        No feedbacks available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

export default Afeedbackmanager;
