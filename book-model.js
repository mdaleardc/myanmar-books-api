const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    
  },
  grade: {
    type: String,
    required: true,
    enum: ["Grade_1", "Grade_2", "Grade_3", "Grade_4", "Grade_5", "Grade_6", "Grade_7", "Grade_8", "Grade_9", "Grade_10", "Grade_11"],
  },
  subject: {
    type: String,
    required: true,
    enum: ["Myanmar", "English", "Mathematics", "Scrince", "Social_Studies", "Life_Skill", "Physics", "Economics", "Biology", "Geometry", "Art", "Chemistry", "Grammar", "History", "Geography"],
  },
  pdfType: {
    type: String,
    required: true,
    enum: ["Textbook", "Answers"],
  },
  curriculum: {
    type: String,
    default: "New"
  },
  pdfUrl: {
    type: String,
    default: "", // will be updated manually later
  },
  thumbnailUrl: {
    type: String,
    default: "", // will be updated manually later
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model("Books", booksSchema);