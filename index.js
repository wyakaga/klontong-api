require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const mainRouter = require("./src/routers");

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use(mainRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});