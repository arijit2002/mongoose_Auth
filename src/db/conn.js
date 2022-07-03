const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //useCreateIndex:true,
    //useFindandModify:true
}).then(function(){
    console.log("connected successfully");
}).catch(function(err){
    console.log("error: " + err);
});
