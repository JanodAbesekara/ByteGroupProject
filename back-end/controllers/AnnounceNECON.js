import AnnouncementNEC from "../models/AnnnounceNE.js";
import Enrollment from "../models/Enrollmentmdels.js";

// Controller to get notifications
const getNotification = async (req, res) => {
  try {
    const { email } = req.query;

    // Fetch enrollments for the user
    const enrollments = await Enrollment.find({ userEmail: email });

    const announceme = await AnnouncementNEC.find({ jobrole: "Admin" });

    // Extract job roles from enrollments
    const uniqueJobRoles = [
      ...new Set(enrollments.map((enrollment) => enrollment.jobRole)),
    ];

    if (uniqueJobRoles.length > 1) {
      return res
        .status(400)
        .json({ success: false, msg: "Inconsistent job roles in enrollments" });
    }

    // Extract subjects, medium, and teacher emails from enrollments
    const enrollmentSets = enrollments.map((enroll) => ({
      subject: enroll.Ensubject,
      medium: enroll.Enmedium,
      email: enroll.teacherEmail,
    }));

    let announcements;

    // Fetch announcements based on job role
    if (uniqueJobRoles[0] === "Admin") {
      // Fetch all announcements if the user is an Admin
      announcements = await AnnouncementNEC.find({});
    } else {
      // Fetch announcements for the enrolled subjects
      announcements = await AnnouncementNEC.find({
        $or: enrollmentSets.map((enroll) => ({
          TeacheSubject: enroll.subject,
          mediua: enroll.medium,
          postedemail: enroll.email,
        })),
      });
    }

    // Return the announcements
    return res.status(200).json({ success: true, announcements, announceme });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const getNotificationT = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, msg: "Email query parameter is required" });
    }

    // Find announcements with jobrole "Admin" and where the viewedBy array does not contain the provided email
    const announcements = await AnnouncementNEC.find({
      jobrole: "Admin",
      viewedBy: { $ne: email },
    });

    // If there are no matching announcements, return an appropriate message
    if (announcements.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          msg: "No announcements found for the given criteria",
        });
    }

    res.status(200).json({ success: true, announcements });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

// Controller to mark an announcement as viewed
const markAnnouncementAsViewed = async (req, res) => {
  try {
    const { announcementId, email } = req.body;

    // Find the announcement by ID
    const announcement = await AnnouncementNEC.findById(announcementId);

    if (!announcement) {
      return res
        .status(404)
        .json({ success: false, msg: "Announcement not found" });
    }

    // Add the user to the viewedBy list if they haven't viewed it yet
    if (!announcement.viewedBy.includes(email)) {
      announcement.viewedBy.push(email);
      await announcement.save();
    }

    return res
      .status(200)
      .json({ success: true, msg: "Announcement marked as viewed" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

export { getNotification, markAnnouncementAsViewed, getNotificationT };
