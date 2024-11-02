import multer from "multer";

function fileUpload() {
    const storage = multer.diskStorage({});

    function fileFilter(req, file, cb) {
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        const allowedVideoTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/mkv'];
        if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid format'), false);
        }
    }

    const upload = multer({ fileFilter, storage })
    return upload;
}

export default fileUpload;
