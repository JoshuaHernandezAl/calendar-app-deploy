const { validationResult } = require('express-validator');


const validarCampos=(req,res,next)=>{
    const err=validationResult(req)//para la validacion, almacenamientos de los middlewares en la req
    if(!err.isEmpty()){
        return res.status(400).json(err);
    }
    next();
}
module.exports ={
    validarCampos,
}