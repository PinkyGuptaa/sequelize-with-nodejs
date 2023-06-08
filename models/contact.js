// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('./index')
module.exports = (sequelize, DataTypes, Model)=>{
const Contact = sequelize.define('Contact', {
  // Model attributes are defined here
  permanent_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  current_address: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
    // user_id: DataTypes.INTEGER
  
}, {
  // Other model options go here
  freezeTableName: true,
  timestamps: false,
  tableName: 'Contact'
});
return Contact;
}
// `sequelize.define` also returns the model
// console.log(User === sequelize.models.Contact); // truemode
// module.exports=Contact;