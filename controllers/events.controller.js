const {response}=require('express');
const Evento=require('../models/Event');

const getEventos=async(req,res=response,next)=>{
    const eventos = await Evento.find().populate('user','name');
    res.json({
        ok:true,
        eventos,
    });
}
const crearEvento=async(req,res=response,next)=>{
    try{
        const evento= new Evento(req.body);
        evento.user=req.uid;
        const eventoDB=await evento.save();
        res.json({
            ok:true,
            evento:eventoDB,
        });
    }catch(err){
        
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:"Contacte al administrador",
        });
    }
}
const actualizarEvento=async (req,res=response,next)=>{
    const eventoId=req.params.id;
    try{
        const evento = await Evento.findById(eventoId);
        if(!evento){
            res.status(404).json({
                ok:false,
                msg:"Error,evento no encontrado",
            });
        }
        if(evento.user.toString()!==req.uid){
            return res.status(403).json({
                ok:false,
                msg:"Error,permisos denegados",
            });
        }
        const nuevoEvento={...req.body,user:req.uid};
        const eventoActualizado=await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});
        res.json({
            ok:true,
            evento:eventoActualizado,
        });
    }
    catch(err){
        
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:"Contacte al administrador",
        });
    }
    
}
const eliminarEvento=async(req,res=response,next)=>{
    const eventoId=req.params.id;
    try{
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:"Error,evento no encontrado",
            });
        }
        if(evento.user.toString()!==req.uid){
            return res.status(403).json({
                ok:false,
                msg:"Error,permisos denegados",
            });
        }
        await Evento.findByIdAndDelete(eventoId);
        res.json({
            ok:true,
            msg:"Evento eliminado"
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok:false,
            msg:"Contacte al administrador",
        });
    }
}

module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}