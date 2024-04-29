import React, { useState, useEffect } from 'react';
import './Classes.css';
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import axios from "axios";
import ComponentClass from './componentClass'; // Importing the component

export default function Classes() {
  const [posts, setPosts] = useState([]);

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

  const filterPostsByEducationLevel = (educationLevel) => {
    return posts.filter(post => post.edulevel === educationLevel);
  };

  const filterPostsBySubject = (educationLevel, subject) => {
    return posts.filter(post => post.edulevel === educationLevel && post.subject === subject);
  };

  const getUniqueSubjectsByEducationLevel = (educationLevel) => {
    const subjects = new Set(posts.filter(post => post.edulevel === educationLevel).map(post => post.subject));
    return Array.from(subjects);
  };

  return (
    <div>
      <Navbar />
      <div className="login_m2" style={{ backgroundColor: "#e2e0e0e9", width: "100%", height: "40px" }}> </div>
      <div className="classes_content">

      
        <div className="class-container">
      
          <div className="class-section1">
            <h3>A/L Classes</h3>
            <div className="class-images1">
              {getUniqueSubjectsByEducationLevel("A/L").map((subject, index) => (
                <div key={index}>
                  <h4>{subject}</h4>
                  <ComponentClass posts={filterPostsBySubject("A/L", subject)} />
                </div>
              ))}
            </div>
          </div>
          <div className="class-section2">
            <h3>O/L Classes</h3>
            <div className="class-images2">
              {getUniqueSubjectsByEducationLevel("O/L").map((subject, index) => (
                <div key={index}>
                  <h4>{subject}</h4>
                  <ComponentClass posts={filterPostsBySubject("O/L", subject)} />
                </div>
              ))}
            </div>
          </div>
          <div className="class-section3">
            <h3>Grade 5 Classes</h3>
            <div className="class-images3">
              {getUniqueSubjectsByEducationLevel("Grade 5").map((subject, index) => (
                <div key={index}>
                  <h4>{subject}</h4>
                  <ComponentClass posts={filterPostsBySubject("Grade 5", subject)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
