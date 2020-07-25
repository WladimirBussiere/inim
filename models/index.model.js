require('dotenv').config();

const mongoose = require('mongoose');
// const User = require('./user.model.js');

//
// mongoose.set('useUnifiedTopology', true );
// mongoose.set('useCreateIndex', true);
// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
//
//
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('connected to db !')
// });

// const models = {User}

// module.exports = models;


function dbConnection(){

  mongoose.set('useUnifiedTopology', true );
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  mongoose
    .connect(process.env.DATABASE_URL, {useNewUrlParser: true})
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((e) => {
      console.log("DB Connection error");
      console.log(e);
    });
}

dbConnection();

module.exports = {dbConnection: dbConnection};
