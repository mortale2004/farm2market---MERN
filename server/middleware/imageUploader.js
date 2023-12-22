const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads/products")),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});


const multerFilter = (req, file, cb)=>{
    if (file.mimetype.startsWith("image"))   
    {
        cb(null, true);
    }
    else
    {
        cb({message: "असमर्थित फायली",}, false);
    }
}


const uploadImageFiles = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 1000000 * 5 },
}).array("image");


module.exports = {uploadImageFiles};
