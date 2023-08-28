const path = require("path");
const dataUriParser = require("datauri/parser");

const cloudinary = require("../configs/cloudinary");

const uploader = async (req, prefix, id) => {
  const { file } = req;

  if (!file) return { data: null };

  const buffer = file.buffer;
  const ext = path.extname(file.originalname).toString();

  const parser = new dataUriParser();
  const datauri = parser.format(ext, buffer);
  const fileName = `${prefix}-${file.fieldname}-${id}`;

  try {
    const result = await cloudinary.uploader.upload(datauri.content, {
      public_id: fileName,
      folder: process.env.CLOUD_FOLDER,
    });
    return { data: result, message: "OK" }
  } catch (error) {
    return { data: null, message: "Failed to upload", error };
  }
}

module.exports = { uploader };