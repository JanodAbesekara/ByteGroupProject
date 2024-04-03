import Announcement from "../models/Announcementmodel.js";

const postanouncement = async (req, res) => {
  const {
    postedemail,
    TeacheSubject,
    Announcementmessage,
    titleofAnn,
    date,
    time,
    jobrole,
  } = req.body;
  try {
    if (
      !postedemail ||
      !jobrole ||
      !Announcementmessage ||
      !titleofAnn ||
      !date ||
      !time
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    } else {
      const newannouncement = new Announcement({
        postedemail,
        TeacheSubject,
        Announcementmessage,
        titleofAnn,
        date,
        time,
        jobrole,
      });
      await newannouncement.save();
      return res
        .status(200)
        .json({ success: true, message: "Announcement posted successfully" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getAnnuncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    return res.status(200).json({ success: true, announcements });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteAnnounce = async (req,res)=>{
   try{
    const data = req.body;
    const _id = data._id;

    await Announcement.deleteOne({_id: _id})
    return res
    .status(200)
    .json({success:true, msg:"Announcement delete !"});
  } catch (error) {
    console.error("Error during post deletion:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

export { postanouncement, getAnnuncements,deleteAnnounce };
