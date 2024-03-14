import profile from "../models/userProfileModel.js";

const userProfileController = async (req, res) => {
  const { subject, degree, experience, aboutme, email } = req.body;

  if (!subject || !degree || !experience || !aboutme || !email) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill in all the fields" });
  }

  try {
    const newprofile = new profile({
      subject,
      degree,
      experience,
      aboutme,
      email,
    });
    await newprofile.save();
    return res
      .status(200)
      .json({ success: true, msg: "Profile details upload successfully " });
  } catch (error) {
    console.error("Error deuring profile details uploading", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Sever Error" });
  }
};



export {userProfileController};
