import { Router } from "express";
import {renderLogin, local_login, logOut, renderRegister, RegisterAlumno, RegisterProfesor, renderRegisterProfesor} from '../controllers/auth_controller.js';
import {isLoggedIn} from '../lib/isLogged.js';
import {isAdmin} from '../lib/validar_rol.js';
const router = Router();

router.get('/login', renderLogin);
router.post('/login', local_login);
router.get('/logout', logOut);
router.get('/register', renderRegister);
router.post('/register', RegisterAlumno);
router.get('/register_profesor',[isLoggedIn,isAdmin], renderRegisterProfesor);
router.post('/register_profesor',[isLoggedIn,isAdmin], RegisterProfesor);

export default router;
