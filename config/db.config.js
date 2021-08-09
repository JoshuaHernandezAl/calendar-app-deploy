const mongoose= require('mongoose');
const dbConnection=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false,
        });
        console.log('Conexion a base de datos exitosa');
    }catch(err){
        console.log(err);
        throw new Error('Error en la conexion de a la base de datos');
    }
}



module.exports={
    dbConnection,
}