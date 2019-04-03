const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
//DB config
const db = require('./config/config').mongoURI
//connect to db
mongoose.connect(db)
    .then(
        () =>{
            console.log("Mongoose Connected")
        }
    )
    .catch(
        (err) =>{
            console.log(err)
        }
    )
app.use(bodyParser({
    formLimit:'1mb'
}))
app.use(require('./routers/api/users').routes())
app.use(require('./routers/api/profiles').routes())
const port = process.env.port || 8080
app.listen(8089, () => {
    console.log(`Server running on port ${port}`)
})

