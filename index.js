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
 
app.post(`${api_url}/upload`, async (req, res) => {
    const {grade, subject, pdfType} = req.body;
  try {
  const book = await bookModel.create({
    title: `${grade} ${subject} ${pdfType}`,
    grade,
    subject,
    pdfType,
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
    res.status(500).json({message: "I don't know", error: err.message});
  }
})

const port = process.env.PORT || 6000;
app.listen(port, ()=> console.log(`Server is running on ${port}`));