const DbModel = require("./db-model");
const DbTeamModel = require("./team-model");

class CoachModel { 
    constructor(){
        DbModel.defineAllTables();
        DbModel.doRelation();
    }
    save(coach){
        return DbModel.CoachModel.create(coach);
    }
    getAll(){
        return DbModel.CoachModel.findAll();
    }
    async saveCoachAndSetTeam(coach,teamId){
        let getTeam = await DbTeamModel.getOneWithPromise(teamId);
        let saveCoach = await  this.save(coach);
        return saveCoach.setTeam(getTeam);
    }
    
    getOneWithPromise(coachId){
        return DbModel.CoachModel.findById(coachId);
    }
    getOne(coachId,cbA,cbB){
        DbModel.CoachModel.findById(coachId).then(val=> {
            cbA(val);
        }).catch(err=>{
            cbB(err);
        })
    }
    deleteCoach(coachId){
        this.getOneWithPromise(coachId).then(coach=>{
            return coach.destroy();
        }).catch(err=>{
            console.log(err);
        })
    }
    updateTeam(coachId,team){
        this.getOne(coachId,(coach)=>{
            coach.setTeam(team);
        },(err)=>{
            console.log(err);
        })
    }
}

module.exports = new CoachModel();