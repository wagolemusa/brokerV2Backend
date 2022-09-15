import multer  from "multer";

const filename = (req, files, next) =>{
    let lastIndex = files.originalname.lastIndexOf(".")
    let ext = file.originalname.substring(lastIndex);
    next(null, `img-${Date.now()}${ext}`);
};

const destination = (req, files, next) => {
    next(null, `${__dirname}/../uploads`)
}

const uploader = multer({
    storage: multer.diskStorage({ destination, filename}),
});

export default uploader;