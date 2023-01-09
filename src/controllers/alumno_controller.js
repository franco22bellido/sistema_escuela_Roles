import pool from '../database.js';


export const perfilAlumno = async (req, res) => {
    try {
        const findCurso = await pool.query(`select * from curso
                        where id =?`,[req.user.curso_id]);


        let newDataAlumno = {
            nombre: req.user.nombre,
            apellido: req.user.apellido,
            nombre_curso: findCurso[0].nombre_curso
        }

        res.render('alumno/alumno', newDataAlumno);

    } catch (error) {
        req.flash('message', error.message);
    }
}

export const verNotas = async (req, res) => {
    let trimestre = req.params.trimestre || 1;
    try {
        const result = await pool.query(`
                select * from materia m
                left join notas n on n.id_materia = m.id
                where n.id_alumno =?
                and n.trimestre =?`,[req.user.id, trimestre]);

        res.render('alumno/alumno_notas', { result });

    } catch (error) {
        req.flash('message', error.message);
    }
}

export const buscarNota = async (req, res) => {
    const { materia } = req.body;


    const result = await pool.query(`
                select * from materia m
                left join notas n on n.id_materia = m.id
                where n.id_alumno =?
                and m.nombre_materia =?`, [req.user.id,materia]);
    res.render('alumno/alumno_notas', { result });
}


const algoritmoHorarios = (i, result, dia) => {
    let dia_semanal;
    
    if (result[i + 0] && result[i + 0].dia == dia) {
            return dia_semanal = result[i + 0].nombre_materia
    };
    if (result[i + 1] && result[i + 1].dia == dia) {
            return dia_semanal = result[i + 1].nombre_materia
    }
    if (result[i + 2] && result[i + 2].dia == dia) {
            return dia_semanal = result[i + 2].nombre_materia
    }
    if (result[i + 3] && result[i + 3].dia == dia) {
            return dia_semanal = result[i + 3].nombre_materia
    }
    if (result[i + 4] && result[i + 4].dia == dia) {
            return dia_semanal = result[i + 4].nombre_materia
    }
}


export const verHorarios = async (req, res) => {

    const result = await pool.query(`
    select hora, dia, nombre_materia from horario h
    inner join horario_materia hm on hm.id_horario = h.id
    inner join materia m on m.id = hm.id_materia
    inner join materia_curso mc on mc.id_materia = m.id
    where mc.id_curso =? order by h.id`,[req.user.curso_id]);


    let reestructuracion = [];
    for (let i = 0; i < result.length;) {

        let lunes = algoritmoHorarios(i, result, 1);
        let martes = algoritmoHorarios(i, result, 2);
        let miercoles = algoritmoHorarios(i, result, 3);
        let jueves = algoritmoHorarios(i, result, 4);
        let viernes = algoritmoHorarios(i, result, 5);

        const objeto = {
            hora: result[i].hora,
            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
        };
        i = i + 5;

        reestructuracion.push(objeto);
    }



    res.render('alumno/alumno_horarios', { reestructuracion });
}