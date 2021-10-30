var express = require("express");
var router = express.Router();
const API_KEY =
  "3b662737eae8dc649891cc16c5b353e1cd0025cc8d1d5db9e5c7feca2f3fcf28";
var path = require("path");
const axios = require("axios");
router.post("/api/login", (req, res, next) => {
  const { email, password } = req.body;
  if (email === "admin@jobhunt.com" && password === "admin123") {
    res.json({ success: true, message: "Login Successful" });
  }
  res.json({ success: false, message: "Please check username and password" });
});

router.get("/api/getJobs", (req, res, next) => {
  const page = 20;
  axios
    .get(`https://www.themuse.com/api/public/jobs?page=${page}`, { API_KEY })
    .then((response) => {
      if (response.status === 200) {
        res.json({ success: true, results: response?.data?.results || [] });
      }
      res.json({ success: false, results: [] });
    })
    .catch((err) => {
      res.json({ success: false, results: [] });
    });

  //
});
/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(path.join(__dirname, "../", "client/build/index.html"));
  res.sendFile(path.join(__dirname, "../", "client/build/index.html"), {
    etag: false,
    lastModified: false,
    headers: {
      "Cache-Control": "private, no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    },
  });
});

module.exports = router;
