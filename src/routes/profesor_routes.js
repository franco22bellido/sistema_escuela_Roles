import {calificaralumno, perfilProfesor, renderCalificar, verHorariosProfesor} from '../controllers/profesor_controller.js';
import { Router } from "express";
import { isLoggedIn } from '../lib/isLogged.js';
import { isAdmin } from '../lib/validar_rol.js';
const router = Router();

router.get('/profesor',[isLoggedIn, isAdmin], perfilProfesor);
router.get('/verhorariosprof',[isLoggedIn, isAdmin],verHorariosProfesor);
router.get('/calificaralumno',[isLoggedIn, isAdmin], renderCalificar);
router.get('/calificaralumno/:materia_id',[isLoggedIn, isAdmin], renderCalificar);
router.get('/calificaralumno/:materia_id/:trimestre',[isLoggedIn, isAdmin], renderCalificar);
router.post('/calificaralumno',[isLoggedIn, isAdmin], calificaralumno);




export default router