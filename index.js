const express = require("express");
require("dotenv").config();
const db_connect = require("./db-connect");
const bookModel = require("./book-model");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db_connect();
 const api_url = process.env.API_URL;
 
 app.get("/", (req, res) => {
   res.send("<h1 style='color:#0060FF; text-align: center; padding-top: 20px'>Welcome to Myanmar School Book Store</h1>");
 });
 
app.post(`${api_url}/upload`, async (req, res) => {
    const {grade, subject, pdfType, categories, specificBookName, pdfUrl} = req.body;
    console.log(req.body);
  try {
  const book = await bookModel.create({
    title: `${grade} ${subject} ${pdfType} ${specificBookName}`,
    grade,
    subject,
    pdfType,
    categories,
    specificBookName,
    pdfUrl,
  });
  console.log(book)
  res.status(200).json("Book uploaded successfully!");
  } catch (err) {
    res.status(500).json("Failed to upload!");
  }
});

app.get(`${api_url}/book-list`, async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json({books});
  } catch (err) {
    res.status(500).json({message: "Failed to get books list!", error: err.message});
  }
});

app.get(`${api_url}/download/:id`, async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found!" });

    // If category is missing, set it to 'Formal_Education' by default
    if (!book.categories) {
      book.categories = "Formal_Education";
      await book.save();
    }

    // Increment the click count
    book.clicks = (book.clicks || 0) + 1;
    await book.save();

    // Check if pdfUrl exists and is valid
    if (!book.pdfUrl) {
      return res.status(400).json({ message: "PDF URL is missing!" });
    }

    // Redirect to the PDF URL
    res.redirect(book.pdfUrl);
  } catch (err) {
    res.status(500).json({ message: "Failed to track download", error: err.message });
  }
});

app.get(`${api_url}/book-detail/:id`, async(req, res)=>{
  try {
  const book = await bookModel.findById(req.params.id);
  res.status(200).json({books});
  } catch (err) {
    res.status(500).json({message: "Failed to get book detail!", error: err.message});
  }
  
} )
const port = process.env.PORT || 6000;
app.listen(port, ()=> console.log(`Server is running on ${port}`));