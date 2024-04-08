import profilemodel from "../models/userProfileModel.js";
import usermodel from "../models/usermodel.js";

const userProfileController = async (req, res) => {
  const { subject, degree, experience, aboutme, email, profilePicUrl, id } = req.body;

  if (!subject || !experience || !aboutme || !email) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill in all the fields" });
  }

  try {
    const newprofile = new profilemodel({
      subject,
      degree,
      experience,
      aboutme,
      email,
      profilePicUrl,
      id,
    });
    await newprofile.save();
    return res
      .status(200)
      .json({ success: true, msg: "Profile details upload successfully !" });
  } catch (error) {
    console.error("An error has occured !", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Sever Error" });
  }
};

const userDetailsController = async (req,res) => {
  try{
    const fetchID = req.params.userID;
    const user = await usermodel.findById(fetchID);
    return res
       .json(user);
  }
  catch(error){
    return res
       .json("An error occurred");
  }
};

const userOtherDetailsController = async (req,res) => {
  try{
    const id = req.params.userID;
    const details = await profilemodel.findOne({id});
    return res
         .json(details);
  }
  catch(error){
    return res
         .json("Error getting user details");
  }
};

export {userProfileController, userDetailsController, userOtherDetailsController};
