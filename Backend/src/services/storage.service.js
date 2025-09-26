const ImageKit = require("imagekit");
const dotenv = require("dotenv");
dotenv.config();
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadImage(file,fileName) {
    console.log("Uploading file:", file);
    const result = await imagekit.upload({
        file: file,
        fileName: fileName
    });
    return result;
}

module.exports = { uploadImage };