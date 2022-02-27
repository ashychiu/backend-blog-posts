const express = require("express");
const app = express();
const PORT = 8080;

const blogRouter = require("./routes/blog");

app.use(express.json());

//express router
app.use("/", blogRouter);

//server port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
