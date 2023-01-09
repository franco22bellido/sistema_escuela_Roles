import { Router } from "express";
import {isLoggedIn} from'../lib/isLogged.js';
import pool from '../database.js';
const router = Router();

router.get('/',[isLoggedIn], async(req, res)=>{
    
    try {
        
    const rol = await pool.query('select * from rol where id =?',[req.user.rol_id]);
    console.log(rol);
    if(rol[0].nombre_rol == 'admin'){
        return res.redirect('/profesor');
    }else if(rol[0].nombre_rol = 'user'){
        return res.redirect('/alumno');
    }else{
        return res.json('no estas logueado');
    }
    } catch (error) {
        console.log(error.message);
    }

});

export default router