
const multer = require('multer');
const path = require('path')


// upload 
// const imgUpload = (imgName,next) => {
// const imgUpload = () => {

    const storage = multer.diskStorage({
        destination: '../public/uploads',
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
        }
    });

    const uploadImg = multer({ storage: storage })
    // return uploadImg;
    //  uploadImg.single(imgName)
    //  next()
// }


// module.exports = imgUpload
module.exports = uploadImg