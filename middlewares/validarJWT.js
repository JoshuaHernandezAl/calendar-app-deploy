const {response}=require('express');
const jwt= require('jsonwebtoken');


const validarJWT=async(req,res=response,next)=>{
    const token= req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion',
        });
    }
    try{
        const {uid,name}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        
        req.uid=uid;
        req.name=name;
        return next();
    }catch(err){
        console.log(err);
        return res.status(401).json({
            msg:'Token no valido',
        });
    }
}




module.exports={
    validarJWT,
}
