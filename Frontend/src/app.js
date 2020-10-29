const express = require("express")
const hbs = require("hbs")
const path = require("path")
const bodyParser = require("body-parser")

const app = express();
//const port = process.env.PORT || 3000


// Paths for express configuration
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// app.engine('hbs', exphbs({
//     defaultLayout: 'header',
//     extname: '.hbs'
// }));

// Set up views engine with hbs
app.set("view engine", "hbs")

// Point express to custom directory path
app.set("views", viewsPath)
hbs.registerPartials(partialsPath) 

// customize express with public content folder directory to serve
app.use(express.static(publicDir))

// Use body parser
app.use(bodyParser.urlencoded({extended: true}))

const teams = [
    {name: "Lakers", image: "https://api.creativecommons.engineering/v1/thumbs/90ef9368-1a88-4bbd-b09d-e980d16f77d0"},
    {name: "Houston", image: "https://api.creativecommons.engineering/v1/thumbs/eb23f3b4-3a5b-42bc-abfc-c10aae2e3e64"},
    {name: "Warriors", image: "https://api.creativecommons.engineering/v1/thumbs/c35de18e-f064-416d-ab6d-e8bb44c0f3ca"}
]

app.get("/", (req, res) => {
    // res.send("This will be the landing page")
    res.render("landing")
})

app.get("/teams", (req, res) => {
    res.render("teams", {teams:teams})
})

app.post("/teams", (req, res) => {
    // Get data from form and add to array
    const team = req.body.team
    const image = req.body.teamImage
    const newTeam = {name: team, image: image}
    teams.push(newTeam)
    // redirect back to landing
    res.redirect("/teams")
})

app.get("/teams/new", (req, res) => {
    res.render("new")
})

app.listen(3000, () => {
    console.log("Server has started")
})