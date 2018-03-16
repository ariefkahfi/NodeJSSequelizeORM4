const DBModel = require("./db-model");


class TeamModel{
    constructor(){
        DBModel.defineAllTables();
        DBModel.doRelation();
    }
    save(team){
        return DBModel.TeamModel.create(team)
    }
    getAll(){
        return DBModel.TeamModel.findAll()
    }
    getOneWithPromise(teamId){
        return DBModel.TeamModel.findById(teamId);
    }
    getOne(teamId,cbA,cbB){
        DBModel.TeamModel.findById(teamId).then(val=>{
            cbA(val);
        }).catch(err=>{
            cbB(err);
        });
    }
    addPlayers(players,teamId){
        this.getOne(teamId,(team)=>{
            team.addPlayer(players);
        },(err)=>{
            console.log(err);
        });
    }
}
module.exports = new TeamModel();