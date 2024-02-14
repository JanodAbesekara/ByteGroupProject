import React from 'react'
import './Dashboard.css';
import Sidebar from '../../../Component/SideBar/Sidebar';

export default function Dashboard() {
  return (
    <div>
      <Sidebar/>
      
      <div className="container">
        <div className="profile_pic">
          <img src=""></img>
        </div>
        <div className='teacher_info'>
          <p>Subject : </p>
          <p>Qualification : </p>
        </div>
      </div>
      <div className='announcement'>
        <h3>What's new</h3>
      </div>
    
    </div>
  )
}
