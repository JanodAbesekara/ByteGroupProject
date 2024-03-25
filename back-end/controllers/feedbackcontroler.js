import Getfeedbacks from '../models/Getfeedbacksmodel.js';

const feedbackget = async (req,res) => {

    const {feedtext,value,studentemail,teacheremail} = req.body;

    if(!feedtext|| !value || !studentemail || !teacheremail){
        return res.status(400).json({success:false,msg:"Please fill in all the fields"});
    }

    try{
        const newfeedback = new Getfeedbacks({feedtext,value,studentemail,teacheremail});
        await newfeedback.save();
        return res.status(200).json({success:true,msg:"Feedback uploaded successfully"});
    }
    catch(error){
        console.error("Error during feedback upload:",error);
        return res.status(500).json({success:false,msg:"Internal Server Error"});
    }
};

const feedbackput = async (req,res) => {
 

};

export { feedbackget ,feedbackput};