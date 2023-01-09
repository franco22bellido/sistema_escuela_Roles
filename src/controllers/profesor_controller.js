import pool from '../database.js';
export const perfilProfesor = async(req, res) => {
    try {
        const findCurso = await pool.query(`select * from curso
                        where id =?`,[req.user.curso_id]);
        

        let newDataProfesor = {
            nombre : req.user.nombre,
            apellido : req.user.apellido,
            nombre_curso : findCurso[0].nombre_curso
        }
  
        res.render('profesor/profesor', newDataProfesor);
        
    } catch (error) {
        req.flash('message', error.message);
    }
}

export const renderCalificar = async (req, res) => {
    try {
        let curso_id = req.user.curso_id;
        let materia_id;
        let rol_alumno = 1; //falta buscar el rol de los alumnos
        let trimestre = req.params.trimestre || 1;

        const findMaterias = await pool.query(`select materia.id, nombre_materia from materia
        left join profesor_materia on profesor_materia.id_materia = materia.id
        where profesor_materia.id_profesor =?`, [req.user.id]);
        
        materia_id = req.params.materia_id || findMaterias[0].id;
        

        const mis_alumnos = await pool.query(`
        select user, nombre_materia from alumno a
        inner join materia_curso mc on mc.id_curso = a.curso_id
        left join materia m on m.id = mc.id_materia
        where mc.id_curso =? and m.id = ?
        and a.rol_id =?
        `,[curso_id,materia_id,rol_alumno]);


        const calificacion_trimestre = await pool.query(`
        select user, nombre_materia, calificacion, trimestre from alumno
        left join notas on notas.id_alumno = alumno.id
        left join materia on materia.id = notas.id_materia
        where alumno.curso_id =?
        and materia.id =?
        and trimestre =?`,[curso_id,materia_id,trimestre]);
    

        res.render('profesor/calificar_alumno', { mis_alumnos, calificacion_trimestre, findMaterias, materia_id});
    } catch (error) {
        req.flash('message', error.message);
        res.redirect('/calificaralumno');
    }

}

export const calificaralumno = async (req, res) => {
    const { user, trimestre, calificacion, materia } = req.body;
    try {
        
        const find_alumno = await pool.query(`select * from alumno where user =?`,[user]);
        if(find_alumno.length < 1 ) throw new Error('alumno no encontrado');

        const find_materia = await pool.query(`select * from materia where nombre_materia =? `,[materia]);
        if(find_materia.length < 1 ) throw new Error('materia no encontrada');

        let newCalificacion = {
            id_alumno: find_alumno[0].id,
            id_materia: find_materia[0].id,
            trimestre,
            calificacion
        }

        const result = await pool.query('insert into notas set ?',[newCalificacion]);
        console.log(result);
        res.redirect('/calificaralumno');
    } catch (error) {
        console.log(error.message);
    }
}; 

export const verHorariosProfesor = async (req, res)=>{
    try {
        
        const HorariosProfesor = await pool.query(`
        select hora, dia, nombre_materia from horario h
        left join horario_materia hm on h.id = hm.id_horario
        left join profesor_materia mp on hm.id_materia  = mp.id_materia
        left join materia on mp.id_materia = materia.id
        where mp.id_profesor =? `,[req.user.id]);
        
        res.render('profesor/profesor_horarios',{HorariosProfesor});

        
    } catch (error) {
        req.flash('message', error.message);
        res.redirect('/');
    }

}