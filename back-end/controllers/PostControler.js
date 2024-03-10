import Postmodels from "../models/Postmodels.js";

const postupdateController = async (req, res) => {
  const { photosURL, edulevel, subject, medium, pagelink } = req.body;

  if (!edulevel || !medium || !photosURL || !subject || !pagelink) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill in all the fields" });
  }

  try {
    const newpost = new Postmodels({
      photosURL,
      edulevel,
      subject,
      medium,
      pagelink,
    });
    await newpost.save();
    return res
      .status(200)
      .json({ success: true, msg: "Post uploaded successfully" });
  } catch (error) {
    console.error("Error during post upload:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const postDetailsControl = async (req, res) => {
  try {
    const postusl = await Postmodels.find({});
    const oldpost = await Postmodels.findOne({ postusl });

    if (oldpost) {
      return res
        .status(403)
        .json({ Success: false, msg: "File already exists" });
    } else {
      return res.status(200).json({ Success: true, data: postusl });
    }
  } catch (err) {
    console.error("Error saving file:", err);
    res.status(500).json({ Success: false, msg: "Internal Server Error" });
  }
};

const ubdatePostcontrolre = async (req, res) => {
  try {
    const { photosURL, edulevel, subject, medium, pagelink } = req.body;

    if (!photosURL) {
      return res
        .status(400)
        .json({ success: false, msg: "Missing required field: photosURL" });
    }

    const updatedPost = await Postmodels.findOneAndUpdate(
      { photosURL },
      {
        $set: {
          medium: medium ? medium : undefined,
          edulevel: edulevel ? edulevel : undefined,
          subject: subject ? subject : undefined,
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, msg: "Post not found" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "Post updated successfully" });
  } catch (error) {
    console.error("Error during post update:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const deletepostcontroller = async (req, res) => {
  try {
    const data = req.body;
    const photosURL = data.photosURL;
    await Postmodels.deleteOne({ photosURL: photosURL });

    return res
      .status(200)
      .json({ success: true, msg: "Post deleted successfully" });
  } catch (error) {
    console.error("Error during post deletion:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};


const getpostcontroller =async (req,res) => {
  try{
    const photosURL = req.body.photosURL;
    const post = await Postmodels.find({photosURL});

    if (!post) {
      return res
        .status(404)
        .json({ success: false, msg: "Post not found" });
    }
    return res
      .status(200)
      .json({ success: true, data: post });

  }

  catch (error) {
    console.error("Error during post deletion:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
    
  }

export {
  postupdateController,
  postDetailsControl,
  ubdatePostcontrolre,
  deletepostcontroller,
  getpostcontroller
};

