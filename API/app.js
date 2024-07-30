const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

mongoose.connect(process.env.mongodbURI)
    .then(
        app.listen(3333, () => {
            console.log('connected to database');
            console.log('server connected to port 3333');
        })
    ).catch(
        (err) => {console.log(err);}
    )

app.use(async(req, res)=>{
    res.status(404).json({
        message: "page not found"
    })
})