const {Sequelize, DataTypes, Model} = require ('sequelize')
const sequelize = new Sequelize('db', 'postgres', 'postgres',{
    host:'localhost',
    dialect: 'postgres',
    logging: true// log details 
});

try{
    sequelize.authenticate();
    console.log('connection has been established successfully');
}catch(error){
    console.log('not connected to database', error)
}
const db ={}
db.Sequelize=Sequelize;
db.sequelize=sequelize;



db.user=require('./user')(sequelize,DataTypes)
db.contact= require('./contact')(sequelize,DataTypes);
db.education = require('./education')(sequelize, DataTypes)

//association 
// db.user.hasMany(db.contact,{ foreignKey: 'UserId' })
// db.contact.belongsTo(db.user,{ foreignKey: 'UserId' })

// save entry in two table using one create function
db.user.hasMany(db.contact,{ foreignKey: 'UserId' })
db.contactUser = db.contact.belongsTo(db.user,{ foreignKey: 'UserId', as: 'users' })


db.contact.hasMany(db.education,{ foreignKey: 'ContactId' })
db.education.belongsTo(db.contact,{ foreignKey: 'ContactId' })


// db.contact.hasMany(db.user, {foreignKey: 'user_id'})
// db.user.belongsTo(db.contact, )
// db.user.belongsToMany(db.contact,{through:'user_contacts'});
// db.contact.belongsToMany(db.user, {through:'user_contacts'})

db.sequelize.sync({force: false})
module.exports = db;
