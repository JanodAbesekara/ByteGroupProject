import mongoose from 'mongoose';
const { Schema } = mongoose;

const fileSchema = new Schema(
    {
       
        PDFurl: {
            type: String,
           
        },
        pdfS:{
            type: String,
           
        },
        discriP:{
            type: String,
            
        },
        videoUrl: {
            type: String,
           
        },
        videosub:{
            type: String,
           
        },  
        videodis:{
            type: String,
           
        },
        audioUrl: {
            type: String,
           
        },
        audiosub:{
            type: String,
          
        },
        audiodis:{
            type: String,
           
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('files', fileSchema);
