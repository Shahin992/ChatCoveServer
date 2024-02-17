const { randomBytes } = require("crypto");
const { existsSync, createReadStream, writeFileSync, readFileSync, mkdirSync } = require("fs");
const path = require("path");

const fileDir = 'files';

const fileUp = async (file) => {
    try {
        if (!file) throw new Error('No file provided');
        const extIdx = file.lastIndexOf('.');
        if (!extIdx) throw new Error('File doesn\'t have an extension');
        const fileExt = file.substring(extIdx + 1);
        const isValid = ["png", "jpg", "jpeg", "svg", "gif", "avif", "webp", "zip"].includes(fileExt.toLowerCase());
        if (!isValid) throw new Error("File not allowed");
        if (!existsSync(path.join(process.cwd(), fileDir))) mkdirSync(path.join(process.cwd(), fileDir));
        const fileName = randomBytes(10).toString('hex') + '.' + fileExt;
        const fileBuffer = readFileSync(file);
        writeFileSync(path.join(process.cwd(), fileDir, fileName), fileBuffer);
        return fileName;
    }
    catch (err) {
        console.log(err);
        throw new Error('Failed to Upload Files');
    }
};

module.exports = fileUp;