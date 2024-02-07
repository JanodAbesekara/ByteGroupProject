import React, { useState } from "react";
import "./Library.css";
import { Select, Radio, Input } from "antd";
import { Row, Col } from "antd";
import { BiSolidFilePdf } from "react-icons/bi";

export default function Library() {
  const { Option } = Select;
  const [value, setValue] = useState();

  const onChange = (selectedValue) => {
    console.log(`selected ${selectedValue}`);
  };

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  const onRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      <div className="L_label">
        <h2>e - LIBRARY </h2>
      </div>
      <div className="filter">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select Subject"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Option value="Maths">Maths</Option>
          <Option value="Chemistry">Chemistry</Option>
          <Option value="Physics">Physics</Option>
        </Select>
        <div className="selectset">
          <label>Media</label>
          <br></br>
          <Radio.Group onChange={onRadioChange} value={value}>
            <Radio style={radioStyle} value={1}>
              Shinhala
            </Radio>
            <Radio style={radioStyle} value={2}>
              English
            </Radio>
            <Radio style={radioStyle} value={3}>
              Tamil
            </Radio>
          </Radio.Group>

          <button className="B1">Search</button>
        </div>
      </div>

      <h2 style={{textAlign:'center',marginBottom:'40px'}}>Science</h2>
      <Row>
        <Col span={6}>
          <h3 style={{marginLeft:"50px",marginBottom:"20px",}}>Chemistry</h3>
          <BiSolidFilePdf style={{width:"25px",height:"25px", color:"red",marginLeft:"50px"}} />
          <h5 style={{marginLeft:"80px"}}>Organic</h5>
        </Col>
        <Col span={6} >
          <h3  style={{marginBottom:"20px"}}>Physics</h3>
          <BiSolidFilePdf style={{width:"25px",height:"25px", color:"red",}} />
          <h5  style={{marginLeft:"40px"}}>Light</h5>
        </Col>
        <Col span={6}>
          <h3  style={{marginBottom:"20px"}}>Combine-Maths</h3>
          <BiSolidFilePdf style={{width:"25px",height:"25px", color:"red"}} />
          <h5  style={{marginLeft:"40px"}}>interagitation</h5>
        </Col>
        <Col span={6}>
          <h3  style={{marginBottom:"20px",marginLeft:'150px'}}>Bialogy</h3>
          <BiSolidFilePdf style={{width:"25px",height:"25px", color:"red",marginLeft:'150px'}} />
          <h5 style={{marginLeft:"190px"}}>Animal Scaience</h5>
        </Col>
      </Row>
    </div>
  );
}
