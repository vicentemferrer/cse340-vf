const express = require('express');
const { resolve } = require('node:path');
const router = express.Router();

require("dotenv").config()

const separator = process.env.NODE_ENV === 'development' ? '\\' : '/';
const dirname = __dirname.split(separator).filter((_, i, arr) => i !== arr.length - 1).join(separator)

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static(resolve(`${dirname}${separator}public`)));
router.use("/css", express.static(resolve(`${dirname}${separator}public${separator}css`)));
router.use("/js", express.static(resolve(`${dirname}${separator}public${separator}js`)));
router.use("/images", express.static(resolve(`${dirname}${separator}public${separator}images`)));

module.exports = router;



