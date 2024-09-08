import multer from "multer";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
	destination: "./uploads/",
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

// Initialize upload
export const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		// Allowed extensions
		const filetypes = /jpeg|jpg|png/;
		const extname = filetypes.test(
			path.extname(file.originalname).toLowerCase()
		);
		const mimetype = filetypes.test(file.mimetype);
		if (extname && mimetype) {
			return cb(null, true);
		} else {
			cb(new Error("Images only!"));
		}
	},
});
