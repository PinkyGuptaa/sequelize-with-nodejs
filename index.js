const bodyParser = require('body-parser')
const express = require('express')
require('./models')
var userCtrl= require('./controller/userController')
// const User = require('./models/user') 
// const Contact = require('./models/contact')

const app = express()
app.use(bodyParser.json())

app.get('/', function (req, res){
    res.send('hello world')

})
app.get('/add', userCtrl.addUser)
app.get('/users', userCtrl.getUsers)
app.get('/users/:id', userCtrl.getUser)
app.post('/users', userCtrl.postUser)
app.delete('/users/:id', userCtrl.deleteUser)
app.patch('/users/:id', userCtrl.patchUser)
app.put('/users/:id', userCtrl.updateUser)
app.get('/raw', userCtrl.rawQueries)
// User.sync({force:true});
app.get('/onetoone', userCtrl.oneToOne)
app.get('/onetomany', userCtrl.onetomany)
app.get('/manytomany', userCtrl.manytomany)

app.get('/loading', userCtrl.loadingUser)
app.get('/eagerloading', userCtrl.eagerloadingUser)
app.get('/creatinguser', userCtrl.creatingUser)
// Contact.sync({force: true})
//its very tedious to do for one one by so we use sequelize.sync method
app.listen(4000,()=>{
console.log('Server Started')
})