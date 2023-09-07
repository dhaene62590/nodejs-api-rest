const express = require("express")
const morgan = require("morgan")
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const {success, getUniqueID} = require('./helper.js')
let pokemons = require("./mock-pokemon")

const app = express()
const port = 3000

// Middleware Logger

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())


// requête api ( On retourne la liste des pokémons au format JSON)


app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon))
})

app.get('/api/pokemons', (req,res) => {
    const message = "La liste des pokémons a bien été récupérée"
    res.json(success(message, pokemons))
})

// Ajout d'un pokemon

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueID(pokemons)
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été crée.`
    res.json(success(message, pokemonCreated))
})

// Modification d'un pokemon 

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
})

// Suppression d'un pokemon 

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé`
    res.json(success(message,pokemonDeleted))
})




app.listen(port, () => console.log(`Notre application node est démarrée sur : http://localhost:${port}`))

