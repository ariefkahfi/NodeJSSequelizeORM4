const Sequelize = require("sequelize");
const sequelize = new Sequelize("s_orm_webapp1","arief","123",{
    dialect:"mysql",
    operatorsAliases:false
});

class MyDatabaseModel {

    defineAllTables(){
        this.CoachModel = sequelize.define("coach",{
            coachId:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                field:"coach_id"
            },
            coachName:{
                type:Sequelize.STRING,
                field:"coach_name"
            }
        },{
            tableName:"coach",
            timestamps:false
        }); 

        this.TeamModel = sequelize.define("team",{
            team_id:{
                type:Sequelize.STRING,
                primaryKey:true,
                field:"team_id"
            },
            teamName:{
                type:Sequelize.STRING,
                field:"team_name"
            },
            teamDivision:{
                type:Sequelize.STRING,
                field:"team_division"
            }
        },{
            tableName:"team",
            timestamps:false
        });

        this.PlayerModel = sequelize.define("player",{
            playerId:{
                type:Sequelize.STRING,
                primaryKey:true,
                field:"player_id"
            },
            playerName:{
                type:Sequelize.STRING,
                field:"player_name"
            },
            playerAddress:{
                type:Sequelize.STRING,
                field:"player_address"
            }
        },{
            tableName:"player",
            timestamps:false
        });
    }

    doRelation(){
        this.TeamModel.hasMany(this.PlayerModel,{
            foreignKey:"team_id",
            as:{
                singular:"player",
                plural:"players"
            }
        });
        
        this.PlayerModel.belongsTo(this.TeamModel,{
            foreignKey:"team_id" 
        });

        this.CoachModel.belongsTo(this.TeamModel,{
            foreignKey:"team_id"
        });
    }

    syncAllTables(f){
        this.doRelation();
        return sequelize.sync({force: f});
    }    
}

module.exports = new MyDatabaseModel();


