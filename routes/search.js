//* routes/signup.js
const express = require("express");
const multer = require("multer");
const uuid = require("uuid");
const fs = require("fs").promises;
const request = require("request-promise");

const router = express.Router();
const { Client } = require("elasticsearch");
const Validator = require("../middleware/Validator");

var client = new Client({ host: "localhost:9200" });

router.get("/searchengine", async (req, res) => {
  const { title } = req.query;
  client.search(
    {
      body: {
        query: {
          match: {
            title: title,
          },
        },
      },
    },
    (error, response) => {
      console.log(response);
      res.json(response);
    }
  );
  //   client
  //     .search({
  //       query: {
  //         match: { title: "asp" },
  //       },
  //     })
  //     .then((result) => {
  //       console.log(Result);
  //       res.json({
  //         haha: "haha",
  //       });
  //     });
  //   axios.post(options.url, options.body).then((result) => {
  //     console.log(result);
  //   });
  //   fetch(options).then((result) => console.log(result));
  //   await fetch(options, function (err, data) {
  //     // console.log(data,err);
  //     res.send(data.body.hits);
  //   });
});

function pdfFilter(req, file, cb) {
  const pdfMime = "application/pdf";
  console.log("The file is", file);
  if (file.mimetype !== pdfMime) {
    cb(new Error("Bruh send pdf"), false);
  }

  // To accept the file pass `true`, like so:
  cb(null, true);

  // You can always pass an error if something goes wrong:
  // cb(new Error("I don't have a clue!"));
}

const upload = multer({
  fileFilter: pdfFilter,
});
router.post(
  "/insert",
  upload.single("pdf"),
  Validator("insert"),
  async (req, res, next) => {
    const {
      etd_file_id,
      advisor,
      author,
      degree,
      program,
      title,
      university,
      year,
      text,
      wikifier_terms,
    } = req.body;
    try {
      const options = {
        url: "http://localhost:9200/wiki_library/_doc/" + etd_file_id,
        body: {
          etd_file_id,
          advisor,
          author,
          degree,
          program,
          title,
          university,
          year,
          text,
          wikifier_terms,
        },
        json: true,
      };
      if (req.file) {
        const fileName = uuid.v4();
        await fs.writeFile(`./uploads/${fileName}.pdf`, req.file.buffer);
        options.body.pdf = `http://localhost:8080/uploads/${fileName}.pdf`;
      }
      const response = await request.post(options);
      console.log("THe Files is", req.file);
      console.log("THE INPUT", req.body);

      res.status(200).json({ response });
    } catch (e) {
      console.log("The error", e.message);
      res.status(500).json({ error: "u fucked up" });
    }
  }
);

module.exports = router;
