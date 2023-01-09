import passport from "passport";
import pool from '../database.js';
import {encriptPassword,comparePass} from '../lib/encriptPass.js';

export const renderRegister = (req, res) => {
    res.render('auth/register');
}
export const RegisterAlumno = async (req, res) => {
    
    const { nombre, apellido, curso, user, password } = req.body;
    
    try {
        const userExist = await pool.query(`SELECT * FROM alumno where user = '${user}'`);        
        if (userExist.length > 0) throw new Error('nombre de usuario ya registrado');
        

        const buscarCurso = await pool.query(`select * from curso where nombre_curso like '%${curso}'`);
        if(buscarCurso < 1) throw new Error('nombre de curso no disponible')

        //los alumnos por defecto tienen el rol de usuario.
        const buscarRol = await pool.query(`SELECT * FROM rol WHERE nombre_rol = 'user'`);
    
        let newPassword = await encriptPassword(password);
        
        let newAlumno = {
            nombre,
            apellido,
            curso_id: buscarCurso[0].id,
            rol_id: buscarRol[0].id,
            user,
            password: newPassword
        }

        const result = await pool.query('insert into alumno set ?',[newAlumno]);
        
        req.flash('success', 'se registró tu usuario con éxito');
        res.redirect('/login');
    } catch (error) {
        req.flash('message', error.message);
        res.redirect('/register');
    }

}

export const renderRegisterProfesor = (req, res)=>{
    res.render('auth/register_profesor');
}
export const RegisterProfesor = async (req, res) => {
    
    const { nombre, apellido, curso, user, materia, password } = req.body;
    
    try {
        
        const userExist = await pool.query(`SELECT * FROM alumno where user = '${user}'`);        
        if (userExist.length > 0) throw new Error('nombre de usuario ya registrado');
        

        const buscarCurso = await pool.query(`select * from curso where nombre_curso like '%${curso}'`);
        if(buscarCurso < 1) throw new Error('nombre de curso no disponible')

        const buscarMateria = await pool.query(`select * from materia where nombre_materia like '%${materia}'`);
        if(buscarCurso < 1) throw new Error('nombre de materia no disponible')

        //los profesores tienen el rol de usuario.
        const buscarRol = await pool.query(`SELECT * FROM rol WHERE nombre_rol = 'admin'`);
    
        let newPassword = await encriptPassword(password);
        

        let newProfesor = {
            nombre,
            apellido,
            curso_id: buscarCurso[0].id,
            rol_id: buscarRol[0].id,
            user,
            password: newPassword
        }

        const saveProfesor = await pool.query('insert into alumno set ?',[newProfesor]);
    

        let newProfesor_materia = {
            id_profesor : saveProfesor.insertId,
            id_materia : buscarMateria[0].id
        }
        await pool.query('insert into profesor_materia set ? ', [newProfesor_materia]);
        
        req.flash('success', 'se registró tu usuario con éxito');
        res.redirect('/login');
    } catch (error) {
        req.flash('message', error.message);
        res.redirect('/register');
    }

}



export const renderLogin = (req, res) => {
    res.render('auth/auth_login');
}

/*algun middleware que dependendiendo de que tipo de usuario sea
me redirija a alumno o profesor cuando voy a la ruta raiz*/
export const local_login = (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);

};
export const logOut = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
}