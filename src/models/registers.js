const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        min: 3,
        max: 50
    },
    password: {
        type: String,
        min : 6,
        required:true        
    }
});


const Register = new mongoose.model("Register",usersSchema);

module.exports=Register;