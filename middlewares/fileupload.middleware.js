import multer from "multer";
import path from "path";

// STORAGE CONFIG
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);

        // Extract extension safely
        const ext = path.extname(file.originalname);

        cb(null, unique + ext);
    }
});

// FILE FILTER (STRICT)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, PNG, WEBP images allowed"), false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB
    },
    fileFilter
});

export default upload;