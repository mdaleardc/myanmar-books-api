const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    
  },
  grade: {
    type: String,
    required: true,
    enum: ["Grade_1", "Grade_2", "Grade_3", "Grade_4", "Grade_5", "Grade_6", "Grade_7", "Grade_8", "Grade_9", "Grade_10", "Grade_11", "Grade_12", "General"],
  },
  subject: {
    type: String,
    required: true,
    enum: ["Myanmar", "English", "Mathematics", "Science", "Social_Studies", "Life_Skills", "Physics", "Economics", "Biology", "Geometry", "Art", "Chemistry", "Grammar", "History", "Geography", "Moral", "Islamic", "Religious_Studies", "Computer_Science", "Health_Education", "Environmental_Studies", "Philosophy", "Psychology", "Political_Science", "Business_Studies", "Accounting", "Physical_Education", "Technology", "Civics", "Home_Science", "Agriculture", "Astronomy", "Literature", "Drama", "Ethics"],
  },
 pdfType: {
  type: String,
  required: true,
  enum: [
    // Formal Education Categories
    "Textbook", "Answers", "Guide", "Notes", "Worksheet", "Exam_Paper", "Reference", "Presentation", "Research_Paper", "Tutorial",

    // Non-Formal Education Categories
    "Self_Study", "Vocational_Training", "Skill_Development", "Adult_Education", "Short_Course", "Workshop_Material", "Community_Learning", "Extracurricular", "Lifelong_Learning"
  ],
},
categories: {
  type: String,
  required: true,
  enum: ["Formal_Education", "Non_Formal_Education"],
},
  pdfUrl: {
    type: String,
    unique: true,
    required: true
  },
  specificBookName: {
  type: String,
  required: false,  // Optional, you can make it required if needed
  default: "",      // Default value if not provided
},
  thumbnailUrl: {
    type: String,
    default: "", // will be updated manually later
  },
  clicks: {
      type: Number,
      default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model("Books", booksSchema);