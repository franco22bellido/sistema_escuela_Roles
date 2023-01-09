import { Router } from "express";
import {buscarNota, perfilAlumno, verHorarios, verNotas} from '../controllers/alumno_controller.js';
import {isLoggedIn} from '../lib/isLogged.js';
import { isUser } from "../lib/validar_rol.js";
const router = Router();

router.get('/vernotas', [isLoggedIn], verNotas);
router.get('/vernotas/:trimestre', [isLoggedIn , isUser], verNotas);
router.get('/vernotas/:trimestre',[isLoggedIn, isUser],  verNotas);
router.post('/buscarnota',[isLoggedIn,isUser], buscarNota);
router.get('/verhorarios',[isLoggedIn, isUser], verHorarios);
router.get('/alumno',[isLoggedIn, isUser], perfilAlumno);



export default router