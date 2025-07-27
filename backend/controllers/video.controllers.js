// controllers/videoController.js
import { Storage } from "@google-cloud/storage";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Movie from "../models/movie.model.js";
import multer, { memoryStorage } from "multer";
import { console } from "inspector";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = new Storage({
  keyFilename: path.join(__dirname, "../config/serviceAccountKey.json"),
});
const bucket = storage.bucket("steamspeherevideos");
const upload = multer({ storage: memoryStorage() });

const uploadVideo = async (req, res) => {
  try {
    const { title, genre, isPublic = true, createdBy = null } = req.body;
    const file = req.file;

    if (!file || !file.buffer) {
      return res.status(400).json({ error: "No file uploaded or file buffer missing" });
    }


    const gcsPath = `${isPublic ? "public" : `private/${createdBy}`}/${Date.now()}-${file.originalname}`;
    const blob = bucket.file(gcsPath);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on("error", (err) => {
      console.error("Upload Error:", err.message);
      res.status(500).json({ error: "GCS upload failed", details: err.message });
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const movie = new Movie({
        title,
        genre,
        url: publicUrl,
        isPublic,
        createdBy,
      });
      await movie.save();

      res.status(200).json({ message: "Uploaded", movie });
    });

    blobStream.end(file.buffer);
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).send("Internal Error");
  }
};

export default {
  uploadVideo,
  uploadMiddleware: upload.single("video"),
};