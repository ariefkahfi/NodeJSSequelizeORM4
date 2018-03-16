const express = require("express");
let teamRouter = express.Router();
const DBTeamModel = require("../models/team-model");
const DBPlayerModel = require("../models/player-model");



teamRouter.get("/",(req,res)=>{
    DBTeamModel.getAll().then(val=>{
        res.json(val);
    }).catch(err=>{
        res.sendStatus(500);
        console.log(err);
    });
})  

teamRouter.post("/",(req,res)=>{
    DBTeamModel.save({
        team_id: req.body.team_id,
        teamName: req.body.team_name,
        teamDivision: req.body.team_division
    }).then(val=>{
        res.json({
            message: "save_data team done !!!"
        });
    }).catch(err=>{
        res.sendStatus(500);
        console.log(err);
    });
});

teamRouter.post("/:team_id/player",(req,res)=>{
    DBPlayerModel.getOne(req.body.player_id,(player)=>{
        DBTeamModel.addPlayers(player,req.params.team_id);
        res.json({message: "addPlayers done !!!"});
    },(err)=>{
        res.sendStatus(500);
        console.log(err);
    });
});

module.exports = teamRouter;