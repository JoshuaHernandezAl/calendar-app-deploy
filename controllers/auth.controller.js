const {response}=require('express');
const Usuario=require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarJWT}=require('../helpers/jwt');

const loginUsuario=async(req,res=response,next)=>{
    const {email,password} = req.body;
    try{
        
        const usuario=await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:"Error, credenciales incorrectas (email)",
            })
        }
        //confirmar password
        const validPassword=bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:"Error, credenciales incorrectas (password)",
            })
        }
        //Generar JWT
        const token=await generarJWT(usuario.id,usuario.name);


        res.json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:'Error, hable con el administrador'
        })
    }
}
const crearUsuario=async(req,res=response,next)=>{
    const {email,password}=req.body;

    try{
        const usuarioDB=await Usuario.findOne({email});
        if(usuarioDB){
            return res.status(400).json({
                ok:false,
                msg:"Error, el usuario ya existe",
            })
        }

        const usuario=new Usuario(req.body);
        //Encriptar password

        const salt= bcrypt.genSaltSync(12);
        usuario.password=bcrypt.hashSync(usuario.password, salt);

        await usuario.save();

        //Generar JWT
        const token=await generarJWT(usuario.id,usuario.name);

        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:'Error, hable con el administrador',
        })
    }
    
}
const revalidarToken=async(req,res=response,next)=>{
    const token=await generarJWT(req.uid,req.name);

    res.json({
        ok:true,
        msg:'revalidar token',
        token,
    });
}

module.exports={
    loginUsuario,
    crearUsuario,
    revalidarToken
}