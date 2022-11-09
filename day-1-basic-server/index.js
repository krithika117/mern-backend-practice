const express = require("express")
const app = express()
const path = require("path")
const port = 5000
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get('/', (req, res) => {
    res.render("userform")
})

app.get('/about', (req, res) => {
    res.render("home")
})

app.get('/contact', (req, res) => {
    res.send(`<h1>Contact.</h1>`)
})

app.post('/result', (req, res) => {
    res.send(req.body.color)
})
app.listen(port, () => {
    console.log('Listening')
})