import Conversition from "../models/Conversitionmodels.js";
import MessageN from "../models/MessageModelsN.js";

const sendMessage = async (req, res) => {
  try {
    const { Message } = req.body;
    const { id: receiverId } = req.params;
    const senderID = req.user._id;

    let Conversition = await Conversition.findOne({
      participants: { $all: [senderID, receiverId] },
    });

    if (!Conversition) {
      Conversition = await Conversition.create({
        participants: [senderID, receiverId],
      });
    }
    const newmessage = new MessageN({
      senderID,
      receiverId,
      Message,
    });

    if(newmessage){
        Conversition.Message.push(newmessage._id);
    }
    await Conversition.save();
    await newmessage.save();


    res.status(200).json({newmessage});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { sendMessage };
