import React, { useEffect, useState } from "react";
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
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

function Subject({ selectedPost, setSelectedPost }) {
  const [posts, setPosts] = useState([]);
 // const [isedit, setEdit] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios
      .get(`api/auth/postdetails`)
      .then((response) => {
        setPosts(response?.data?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // const updateuser = (updatepost) => {
  //
  //   const payload = {
  //     photosURL: updatepost.photosURL,
  //     edulevel: updatepost.edulevel,
  //     subject: updatepost.subject,
  //     medium: updatepost.medium,
  //   };
  //   axios
  //     .post(`api/auth/ubdatepost`, payload)
  //     .then(() => {
  //       getPosts();
  //       isedit(false);
  //       setSelectedPost(null);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };
  //
  const handleSelectPost = (photoUrl) => {
    setSelectedPost(photoUrl);
  };

  const deletePost = (photosURL) => {
    const payload = { photosURL: photosURL };

    axios
      .post(`api/auth/deletepost`, payload)
      .then(() => {
        getPosts();
      })
      .catch((error) => {
        console.log("Axios Error :", error);
      });
  };

  const handleDeleteConfirmation = (photosURL) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      deletePost(photosURL);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ marginBottom: "50px" }}>
          <TableHead>
            <TableRow sx={{ marginBottom: "60px", backgroundColor: "#B5DFCA" }}>
              <TableCell sx={{ marginBottom: "30px", textAlign: "center" }}>
                Subject
              </TableCell>
              <TableCell sx={{ marginBottom: "30px", textAlign: "center" }}>
                Education Level
              </TableCell>
              <TableCell sx={{ marginBottom: "30px", textAlign: "center" }}>
                Medium
              </TableCell>
              <TableCell sx={{ marginBottom: "30px", textAlign: "center" }}>
                Uploaded Post
              </TableCell>
              <TableCell sx={{ marginBottom: "30px", textAlign: "center" }}>
                Edit/Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell sx={{ textAlign: "center" }}>
                  {post.subject}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {post.edulevel}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {post.medium}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <a
                    href={post.photosURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={post.photosURL}
                      alt="Post"
                      style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                      }}
                    />
                  </a>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <button
                    style={{
                      padding: "2px 10px",
                      backgroundColor: "Blue",
                      color: "White",
                      borderRadius: "5px",
                      border: "none",
                    }}
                    onClick={() => handleSelectPost(post.photosURL)}
                  >
                    Edit
                    <CiEdit />
                  </button>
                  <button
                    style={{
                      padding: "2px 10px",
                      fontSize: "15px",
                      marginLeft: "10px",
                      backgroundColor: "Red",
                      color: "White",
                      borderRadius: "5px",
                      border: "none",
                    }}
                    onClick={() => handleDeleteConfirmation(post.photosURL)}
                  >
                    Delete
                    <MdDeleteOutline />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Subject;
