const mongoose = require('mongoose');

mongoose.connect("use your db link", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //useCreateIndex:true,
    //useFindandModify:true
}).then(function(){
    console.log("connected successfully");
}).catch(function(err){
    console.log("error: " + err);
});
