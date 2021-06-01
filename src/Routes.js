const express = require("express");
const routes = express.Router();
const DB = require("./BD");

//return all team
routes.get(("/team"), (req,res) => {
    if(DB.team == undefined){
        res.status(400).json({ msg: "Não possui times cadastrados." });
    }else{
        res.status(200).json(DB.team);
    }
});

//return a team with name
routes.get(("/team/:name"), (req,res) => {
    const nome = req.params.name;
    const character = DB.team.find((n)=> (n.name == nome));

    if(character == undefined){
        res.status(400).json({ msg: "Não possui times cadastrados." });
    }else{
        res.status(200).json(character);
    }
});

//Add a new team
routes.post("/newTeam", (req,res) => {
const{
    name,
    city,
    teamState,
    serie,
    titlesNumber,
    payrol
} = req.body;
    if(name && city && teamState && titlesNumber && payrol != undefined){
        const id = DB.team.length + 1;
        DB.team.push({
            id,
            name,
            city,
            teamState,
            serie,
            titlesNumber,
            payrol,
        });
        res.status(200).json({ msg:"Adicionado com sucesso." });
    }else{
        res.status(400).json({ msg: "Dados faltando."});
    }
});

//Edit a team
routes.put("/teamEdit/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        const id = parseInt(req.params.id);
        const team = DB.team.find((c) => c.id == id);

        if(team != undefined){
            const{
                id,
                name,
                city,
                teamState,
                serie,
                titlesNumber,
                payrol,
            } = req.body;
                if(name != undefined) team.name = name;
                if(city != undefined) team.city = city;
                if(teamState != undefined) team.teamState = teamState;
                if(titlesNumber != undefined) team.titlesNumber = titlesNumber;
                if(payrol != undefined) teamState.payrol = payrol;
            res.status(200).json({ msg: "Alteração realizada com sucesso!" });
        }else{
            res.status(400).json({ msg: "Time não existe." });
        }
    }
});

//Excluir um time
routes.delete("/deleteTeam/:id", (req,res) => {
    if(isNaN(req.params.id))
    {
        res.status(400);
    }else
    {
        const id = parseInt(req.params.id);
        const index = DB.team.findIndex((c) => c.id == id);
        if(index == -1) { res.status(400).json({ msg: "Time não existe!" });
        } else {
            DB.team.splice(index,1);
            res.status(200).json({ msg:"Time excluido com sucesso!" });
        }
    }
});

module.exports = routes;