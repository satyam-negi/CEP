const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth")

const app = express();

app.use(express.json());
app.use(cors());

// statusCode index:
// 500 - reg succesful
// 501 - same email while reg
// 502 - login info doesn't match any records
// 550 - login succesful

app.use("/api", authRoutes)

app.listen(3001, () => {
    console.log("running srverrrrrr");
});