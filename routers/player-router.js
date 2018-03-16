const playerRouter = require("express").Router();
const DBPlayerModel = require("../models/player-model");

playerRouter.get("/",(req,res)=>{
    DBPlayerModel.getAll().then(players=>{
        res.json(players);
    }).catch(err=>{
        res.status(500).json(err);
        console.log(err);
    })
})

playerRouter.post("/:player_id/change-team",(req,res)=>{
    DBPlayerModel.changeTeam(req.params.player_id,req.body.team_id)
        .then(result=>{
            res.json(result);
        }).catch(err=>{
            res.status(500).json({message: "ERROR_INTERNAL_SERVER"});
            console.log(err);
        });
})

playerRouter.post("/",(req,res)=>{
    DBPlayerModel.savePlayerAndSetTeam({
        playerId: req.body.player_id,
        playerName: req.body.player_name,
        playerAddress: req.body.player_address
    },req.body.team_id).then((result)=>{
        res.json({
            message: "save_player and set_team done !!"
        });
    }).catch(err=>{
        res.status(500).json(err);
        console.log(err);
    });
})


module.exports = playerRouter;