const express = require('express')
const config = require('./src/config/config')

const app = express()

app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.por}`)
})