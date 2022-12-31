const express = require("express");
const { open } = require("sllite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "cricketMatchDetails.db");

const express = express();
app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.database,
    });
    app.listen(3000, () =>
      console.log("server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error:${error.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

const convertPlayerDbObjectToResponseObject = (dbObject) =>{
    return {
        playerId:dbObject.playerId,
        playerName:dbObject.playerName,
    };
};

app.get("/players/",(request,response)=>{
    const getPlayersQuery = `
        SELECT 
        * 
        FROM 
        player_details;
    `;
    const statesArray = await database.all(getPlayersQuery);
    response.send(
        statesArray.map((eachElement)=>convertPlayerDbObjectToResponseObject(eachElement))
    );
});