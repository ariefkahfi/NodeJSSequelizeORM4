const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const teamRouter = require("./routers/team-router");
const coachRouter = require("./routers/coach-router");
const playerRouter = require("./routers/player-router");

app.use(bodyParser.urlencoded({
    extended : true
}));


app.use("/api/coach",coachRouter);
app.use("/api/team",teamRouter);
app.use("/api/player",playerRouter);


app.listen(9600,()=>{
    console.log("listening on port 9600");
});