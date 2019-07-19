const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    user:{
        type: String,
        index: {unique: true},
        required: [true, 'El nombre es necesario']
    },
    pass:{
        type: String,
        required: [true, 'El password es necesario']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false,
    },
    img:{
        type: String,
        required: false,
    }
});

usuarioSchema.methods.encriptarPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.pass;
    return userObject;
}

usuarioSchema.methods.compararPassword = function(password){
    return bcrypt.compareSync(password, this.pass);
} 

module.exports = mongoose.model('users', usuarioSchema);