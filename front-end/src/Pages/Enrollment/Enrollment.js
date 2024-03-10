import React, { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function Enrollment() {



   
  const teachersData = [
    {
      id: 1,
      name: "Mr. Anil Perera",
      subject: "Chemistry",
      profileImageUrl: "url_to_teacher_profile_image.jpg",
    },
    {
      id: 2,
      name: "Ms. Sarah Smith",
      subject: "Biology",
      profileImageUrl: "url_to_another_teacher_profile_image.jpg",
    },
    
    {
      id: 3,
      name: "Mr. John Dhoeee",
      subject: "Physics",
      profileImageUrl: "url_to_another_teacher_profile_image.jpg",
    },
    {
      id: 4,
      name: "Mr. John Doe",
      subject: "Mathematics",
      profileImageUrl: "url_to_another_teacher_profile_image.jpg",
    },
  ];

  const [teachers, setTeachers] = useState(teachersData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const filteredTeachers = teachersData.filter((teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTeachers(filteredTeachers);
    
  };

  return (
    <div>
      <h1>Enroll your Courses</h1>
      <div className="search" style={{justifyContent:"center", alignContent:"center" ,display:"flex",marginBottom:"50px"}}>
        <input
          className="search1"
          placeholder="Search teacher.."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{width:"300px", height:"30px", borderRadius:"5px", border:"1px solid black", padding:"5px",marginRight:"10px"}}
        />
        <button onClick={handleSearch}
        style={{width:"100px", height:"30px", borderRadius:"5px", border:"1px solid #40A2E3", padding:"5px", backgroundColor:"#40A2E3", color:"white",boxShadow:"2px 1px 10px 0.5px black"}}
        >Search</button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{backgroundColor:"#201658", marginTop:"50px"}}>
              <TableCell sx={{color:"white", borderRight:"2px white solid", borderLeft:"2px white solid", textAlign:"center"}}>Teacher Profile</TableCell>
              <TableCell sx={{color:"white" ,borderRight:"2px white solid" , textAlign:"center"}}>Teacher Name</TableCell>
              <TableCell sx={{color:"white" , borderRight:"2px white solid" , textAlign:"center"}}>Subject</TableCell>
              <TableCell sx={{color:"white", borderRight:"2px white solid" , textAlign:"center"}}>Enroll</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell sx={{textAlign:"center" }}>
                  <img
                    src={teacher.profileImageUrl}
                    style={{ borderRadius: "100%" }}
                    alt="Teacher Profile"
                  />
                </TableCell>
                <TableCell sx={{textAlign:"center" }}>{teacher.name}</TableCell>
                <TableCell sx={{textAlign:"center" }}>{teacher.subject}</TableCell>
                <TableCell sx={{justifyContent:"center", alignContent:"center" ,display:"flex" }}>
                  <button style={{color:"white",backgroundColor:"#1b690d", border:"2px solid white" , borderRadius:"20px", padding:"5px",boxShadow:"2px 1px 10px 0.5px black"}}>Enroll</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Enrollment;
