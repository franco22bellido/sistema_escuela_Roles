import passport from "passport";
import localStrategy from 'passport-local';
import pool from '../database.js';
import {comparePass} from '../lib/encriptPass.js';

passport.use('local.login', new localStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, user, password, done)=>{
    
    try {
        const result = await pool.query('SELECT * FROM alumno where user =?',[user]);
        if(result.length < 1) throw new Error('nombre de usuario no encontrado');

        //se comparan las contraseñas.
         const trueFalse = await comparePass(password, result[0].password);
         if(!trueFalse) throw new Error('contraseña invalida');
        

        user = result[0];
        done(null, user);
    } catch (error) {
        done(null, false, req.flash('message', error.message));    

    }

}));
passport.serializeUser((user, done)=>{
    
    done(null, user.id);
});
passport.deserializeUser(async(id, done)=>{
    const result = await pool.query('SELECT * FROM alumno WHERE id = ?',[id]);
    done(null, result[0]);
});

export default passport;