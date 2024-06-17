import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function PayCard({ regdetal }) {
  const [resite, setResite] = useState("");
  const [recpec, setRecpec] = useState(0);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (photo) {
      uploadFile(photo, "photoUrl");
    }
  }, [photo]);

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const folder = fileType === "photoUrl" ? "Recite/" : "Unknown/";
    const fileName = new Date().getTime() + "_" + file.name;
    const storageRef = ref(storage, `${folder}${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setRecpec(Math.round(progress));
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("DownloadURL -", downloadURL);
          if (fileType === "photoUrl") {
            setResite(downloadURL);
          }
        });
      }
    );
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const stuemail = decodedToken.email;
    const paylord = {
      photourl: resite,
      TeacherEmail: regdetal.email,
      stuemail,
      Subject: regdetal.subject,
      medium: regdetal.medium,
      Bankname: regdetal.payment.bank,
      AccountNum: regdetal.payment.accountNo,
    };

    axios
      .post(`/api/Test/poststudentpayment`, paylord)
      .then((res) => {
        window.alert("Payment done successfully");
       window.location.reload();
      })
      .catch((err) => {
        window.alert("Payment failed");
      });
  };

  return (
    <div>
      <div style={{paddingLeft:"10px", display:"flex"}}>
      <form onSubmit={handlesubmit} style={{display:"flex", flexDirection:"column"}}>
        {recpec > 0 && "Uploading : " + recpec + "%"}
        <div>
        <lebel style={{fontSize :"14px", fontWight:"700"}}>PAYMENT RECEIPT : </lebel>
        
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          style={{
            marginBottom: "5px",
          }}
        />
        </div>
        <div>
        <button type="submit" name="submit" style={{padding:"2px",}}>
          Upload
        </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default PayCard;
