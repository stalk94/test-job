require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { Octokit } = require ("@octokit/core");


const app = express();
const jsonParser = bodyParser.json();
const octokit = new Octokit({auth: process.env.token});


app.get("/", (req, res)=> {
	res.sendFile(__dirname+"/dist/index.html");
});
app.post("/users", jsonParser, (req, res)=> {
	if(req.body.name) octokit.request(`/users/${req.body.name}`, {per_page:100}).then((value)=> {
		res.send(value.data)
	});
});
app.post("/repo", jsonParser, (req, res)=> {
	if(req.body.login) octokit.request(`/users/${req.body.login}/repos`).then((value)=> {
		res.send(value.data)
	});
});


octokit.request(`/users/stalk94`).then(console.log)
app.use('/', express.static(path.join(__dirname, '/dist')));
app.listen(3000, ()=> console.log("listens http://localhost:3000"))