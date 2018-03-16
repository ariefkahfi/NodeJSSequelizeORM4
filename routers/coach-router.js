const express = require("express");
const DBcoachModel = require("../models/coach-model");
const DBTeamModel = require("../models/team-model");
let router = express.Router();


router.post("/",(req,res)=>{
    DBcoachModel.saveCoachAndSetTeam({
        coachName: req.body.coach_name
    },req.body.team_id).then(result=>{
        res.json({
            message: "save_coach and set_team done !! "
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
});

router.get("/",(req,res)=>{
    DBcoachModel.getAll().then(val=>{
        res.json(val);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
});

router.post("/:coach_id/team",(req,res)=>{
    DBTeamModel.getOne(req.body.team_id,(team)=>{
        DBcoachModel.updateTeam(req.params.coach_id,team);
        res.end("update_team on coach_router complete !!!");
    },(err)=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
