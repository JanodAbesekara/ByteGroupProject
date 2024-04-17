import profileSchema from "../models/userProfileModel.js";
import userSchema from "../models/usermodel.js";

const Enrolementcontroller = async (req, res) => {
  try {
    const enrolement = await profileSchema.find();
    const userdata = await userSchema.find();

    // Extract unique email addresses from both datasets
    const enrolementEmails = new Set(enrolement.map((item) => item.email));
    const userDataEmails = new Set(userdata.map((item) => item.email));

    // Find common email addresses across all datasets
    const commonEmails = [...enrolementEmails].filter((email) => userDataEmails.has(email));

    // Combine data where email is common
    const combinedData = [];

    for (const email of commonEmails) {
      const userProfile = enrolement.find((item) => item.email === email);
      const userPosts = userdata.find((item) => item.email === email);

      if (userProfile && userPosts) {
        combinedData.push({
          email,
          profile: userProfile,
          posts: userPosts
        });
      }
    }

    return res.status(200).json({ success: true, data: combinedData });
  
  } catch (error) {
   return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

export { Enrolementcontroller };
