import pool from '../database.js';

export const isAdmin = async(req, res, next)=>{

    let validar = await pool.query('select * from rol where id =?',[req.user.rol_id]);
    
    if(validar[0].nombre_rol == 'admin'){
        return next();
    }else{
        req.flash('message', 'no tienes privilegios de administrador');
        res.redirect('/');
    }
 
}

export const isUser = async(req, res, next)=>{
    
    const result = await pool.query('select * from rol where id =?',[req.user.rol_id]);

    if(result[0].nombre_rol == 'user'){
        next();
    }else{
        req.flash('message', 'no tienes roles de alumno');
        res.redirect('/');
    }
    ;
};