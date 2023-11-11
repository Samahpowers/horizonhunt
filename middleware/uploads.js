import multer from "multer";

const storage = multer.memoryStorage(); // Use memory storage to handle file data in memory

const upload = multer({ storage });

export default upload;




