const DBModel = require("./db-model");
const DBTeamModel = require("./team-model");
class PlayerModel{
    constructor(){
        DBModel.defineAllTables();
        DBModel.doRelation();
    }
    save(player){
        return DBModel.PlayerModel.create(player)
    }
    async savePlayerAndSetTeam(player,teamId){
        let getTeam = await DBTeamModel.getOneWithPromise(teamId);
        let savePlayer = await this.save(player);
        return getTeam.addPlayer(savePlayer);
    }
    getAll(){
        return DBModel.PlayerModel.findAll()
    }

    async changeTeam(playerId,oldTeamId){
        let getPlayer = await this.getOneWithPromise(playerId);
        let getOldTeam = await DBTeamModel.getOneWithPromise(oldTeamId);
        return getPlayer.setTeam(getOldTeam);
    }
    deletePlayer(playerId){
        this.getOneWithPromise(playerId).then(player=>{
            return player.destroy()
        }).catch(err=>{
            console.log(err);
        });  
    }
    getOneWithPromise(playerId){
        return DBModel.PlayerModel.findById(playerId)
    }
    getOne(playerId,cbA,cbB){
        DBModel.PlayerModel.findById(playerId).then(val=>{
            cbA(val);
        }).catch(err=>{
            cbB(err);
        })
    }
}

module.exports = new PlayerModel();