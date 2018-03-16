const DBModel = require("./models/db-model");


DBModel.defineAllTables();

DBModel.syncAllTables(true).then(val=>{
    console.log(val);
}).catch(err=>{
    console.log(err);
});