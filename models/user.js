// const { DataTypes } = require('sequelize');

// const { DataTypes } = require("sequelize");

// const sequelize = require('./index')
module.exports = (sequelize, DataTypes)=>{
const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  // deletedAt:{
  //   type: DataTypes.NOW,
  //   allowNull: false

  // }
}, {
  // Other model options go here
  tableName: 'User',
  freezeTableName: true,
  timestamps: false,
  // paranoid: true, 
  // deletedAt: 'soft_delete'

});
return User;
}
// User.sync()
// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
// module.exports= User;


