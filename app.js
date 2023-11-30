const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// 파일 저장 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 타임스탬프 + 원래 확장자
  },
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname))); // 정적 파일 제공 설정

// 파일 업로드 처리 로직
app.post("/upload", upload.single("image"), (req, res) => {
  // 파일이 req.file에 저장됩니다.
  console.log("File uploaded: ", req.file);
  res.send("File uploaded successfully!");
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "upload.html"));
  // upload.html은 클라이언트의 HTML 파일 이름입니다.
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
