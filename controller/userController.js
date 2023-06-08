var db = require('../models')
var User = db.user;
var Contact = db.contact;
const {Sequelize } = require('sequelize')

var addUser = async (req, res)=>{
    // console.log('first')
    const jane = await User.create({firstName: 'Pinky',lastName: 'Gupta'});
   //we dont use json.save with create method
    // const jane = User.build({firstName: 'Jane',lastName: 'Singh'});
    console.log(jane instanceof User)//true
    console.log(jane.firstName)//"Jane"
    // await jane.save();
    await jane.update({firstName: "Pinky", lastName : "Singh"})
    // await jane.save();
    await jane.destroy();
    console.log('jane was saved to the database');
    console.log(jane.toJSON());
    res.status(200).json(jane.toJSON())
}


var getUsers = async (req,res)=>{
    const users = await User.findAll({})
    res.status(200).json(users)
}
var getUser = async (req,res)=>{
  
    const data = await User.findOne({  
        where :{
            id: req.params.id
        }
    });
    res.status(200).json({data:data})
}
var postUser = async (req, res)=>{
postData = req.body;
if(postData.length>1){
     await User.bulkCreate(postData)
}else{
await User.create(postData);}
res.status(201).json("saved successfully")
}
var deleteUser = async (req, res)=>{
    const data = await User.destroy({  
        where :{
            id: req.params.id
        }
    });
    res.status(200).json({data})
}
var patchUser = async (req, res)=>{
    var updatedData = req.body;
    const data = await User.update(updatedData,{  
        where :{
            id: req.params.id
        }
    });
    res.status(200).json({data:data})
}

var updateUser = async (req,res)=>{
  var updatedData = req.body;
  const id = req.params.id;

    try {
    const user = await User.findOne({
      where: {
        id: id
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update(updatedData);

    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const { QueryTypes } = require('sequelize');



var rawQueries = async (req,res) =>{

    const users = await db.sequelize.query('SELECT * FROM "User" where id = $id',
    {
        // replacements: ['1'],
        bind:{id:'4'},
        type: QueryTypes.SELECT, 
    model: User});
    res.status(200).json({data:users})
}
var oneToOne = async (req, res) =>{
    // var data =await User.create( {firstName: 'Hemant', lastName:'Singh'})
    // if (data && data.id){
    //     await Contact.create({permanent_address:'mahipalpur', current_address:'delhi',
    // 'user_id': data.id})
    // }
var data = await User.findAll({
    include: Contact,
    attributes:['firstName', 'lastName']
})

    res.status(200).json({data:data})
}
var onetomany = async (req, res) =>{
    // var data =await User.create( {firstName: 'Hemant', lastName:'Singh'})
    // if (data && data.id){
    //     await Contact.create({permanent_address:'karol bagh', current_address:'delhi',
    // 'user_id': 1})
    
    var data = await User.findAll({
        
        attributes:['firstName', 'lastName'],
        include: [
            {
                model: Contact,
                atributes:['permanent_address', 'current_address']
            }
        ],

    })


    res.status(200).json({data:data})
}
var manytomany = async (req, res) =>{
    //  var data =await User.create( {firstName: 'Shahz', lastName:'Singh'})
    // if (data && data.id){
    //     await Contact.create({permanent_address:'karol bagh', current_address:'delhi'})
    // }
    // var data= {}

    // contact - user
    // var data = await Contact.findAll({
    //     atributes:['permanent_address', 'current_address'],
        
    //     include: [
    //         {
    //             model: User,
    //             attributes:['firstName', 'lastName'],
                
    //         }
    //     ],

    // })
// user - contact 
var data = await User.findAll({
        
    attributes:['firstName', 'lastName'],
    include: [
        {
            model: Contact,
            atributes:['permanent_address', 'current_address']
        }
    ],

})

    res.status(200).json({data:data})
}

module.exports={
    addUser,
    getUsers,
    getUser,postUser,
    deleteUser,
    patchUser, 
    updateUser,
    rawQueries,
    oneToOne,
    onetomany,
    manytomany
}