import files from "../models/Filemodels.js";

const fileuplodController = async (req, res) => {
  const { PDFurl, pdfS, discriP, videoUrl, videosub, videodis, audioUrl, audiosub, audiodis } = req.body;

  if (!PDFurl && !videoUrl && !audioUrl) {
    return res.status(400).json({ Success: false, msg: "At least one file is required" });
  }
 
  
  try {
    if (PDFurl) {
     
      const existingPDF = await files.findOne({ discriP: discriP });
      if (existingPDF) {
        return res.status(403).json({ Success: false, msg: "PDF already exists" });
      }

      const newPDF = new files({ PDFurl, pdfS, discriP });
      await newPDF.save();
      return res.status(200).json({ Success: true, msg: "PDF uploaded successfully" });
    }

    if (videoUrl) {
     
      const existingVideo = await files.findOne({ videodis: videodis });
      if (existingVideo) {
        return res.status(403).json({ Success: false, msg: "Video already exists" });
      }
    
      const newVideo = new files({ videoUrl, videosub, videodis });
      await newVideo.save();
      return res.status(200).json({ Success: true, msg: "Video uploaded successfully" });
    }

    if (audioUrl) {
    
      const existingAudio = await files.findOne({ audiodis: audiodis });
      if (existingAudio) {
        return res.status(403).json({ Success: false, msg: "Audio already exists" });
      }
    
      const newAudio = new files({ audioUrl, audiosub, audiodis });
      await newAudio.save();
      return res.status(200).json({ Success: true, msg: "Audio uploaded successfully" });
    }
  } catch (err) {
    return res.status(500).json({ Success: false, msg: "Internal Server Error" });
  } 
};

export { fileuplodController };
