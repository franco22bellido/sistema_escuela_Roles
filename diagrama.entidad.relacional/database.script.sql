/*prueba de database*/
/*ejecutar consultas una por una.
tiene de ejemplo las materias y horarios de solo un curso.
*/


create database old_escuela;
use old_escuela; 


create table materia(
	id int primary key auto_increment,
    nombre_materia varchar(255)
);
create table horario(
	id int primary key auto_increment,
    hora varchar(255),
    dia int
);

create table horario_materia(
	id int primary key auto_increment,
    id_materia int,
    id_horario int,
    foreign key(id_materia) references materia(id),
    foreign key(id_horario) references horario(id)
);

create table rol(
	id int primary key auto_increment,
    nombre_rol varchar(255)
);

create table curso(
	id int primary key auto_increment,
	nombre_curso varchar(255)
);

create table alumno(
	id int primary key auto_increment,
    nombre varchar(255),
    apellido varchar(255),
	rol_id int,
    curso_id int,/*null si se esta registrando un profesor*/
    foreign key(rol_id) references rol(id),
    foreign key(curso_id) references curso(id)
);
alter table alumno add column password varchar(255);
alter table alumno add column user varchar(255) unique;
/*la tabla alumno deberia tener el nombre "ususario" ya que en esta tabla
se van a alojar támbien los profesores*/

/*un profesor puede estar en varias materias*/
create table profesor_materia(
	id int primary key auto_increment,
    id_profesor int,
    id_materia int,
    foreign key(id_profesor) references alumno(id),
    foreign key(id_materia) references materia(id)
);


create table notas(
	id int primary key auto_increment,
    id_alumno int,
    id_materia int,
	trimestre int,
    calificacion int,
    foreign key(id_alumno) references alumno(id),
    foreign key(id_materia) references materia(id)
);

create table materia_curso(
	id int primary key auto_increment,
    id_materia int,
    id_curso int,
    foreign key(id_materia) references materia(id),
    foreign key(id_curso) references curso(id)
);









/*insertando cursos*/
insert into curso(nombre_curso) values('CURSO 2B');
insert into curso(nombre_curso) values('CURSO 2A');


/*insertar los horarios disponibles donde el dia de la semana
es representado con un integer*/
insert into horario(hora, dia) values('12:40', 1);
insert into horario(hora, dia) values('12:40', 2);
insert into horario(hora, dia) values('12:40', 3);
insert into horario(hora, dia) values('12:40', 4);
insert into horario(hora, dia) values('12:40', 5);

insert into horario(hora, dia) values('14:40', 1);
insert into horario(hora, dia) values('14:40', 2);
insert into horario(hora, dia) values('14:40', 3);
insert into horario(hora, dia) values('14:40', 4);
insert into horario(hora, dia) values('14:40', 5);

insert into horario(hora, dia) values('16:40', 1);
insert into horario(hora, dia) values('16:40', 2);
insert into horario(hora, dia) values('16:40', 3);
insert into horario(hora, dia) values('16:40', 4);
insert into horario(hora, dia) values('16:40', 5);


/*inertar materias*/
insert into materia(nombre_materia) values('matematicas');
insert into materia(nombre_materia) values('música');
insert into materia(nombre_materia) values('literatura');
insert into materia(nombre_materia) values('tecnologia');
insert into materia(nombre_materia) values('historia');
insert into materia(nombre_materia) values('ingles');
insert into materia(nombre_materia) values('quimica');
insert into materia(nombre_materia) values('arte');
insert into materia(nombre_materia) values('filosofia');
insert into materia(nombre_materia) values('geografia');


/*inertarle un horario a cada materia*/
insert into horario_materia(id_materia, id_horario) values(2, 1);
insert into horario_materia(id_materia, id_horario) values(3, 2);
insert into horario_materia(id_materia, id_horario) values(4, 3);
insert into horario_materia(id_materia, id_horario) values(5, 4);
insert into horario_materia(id_materia, id_horario) values(6, 5);
insert into horario_materia(id_materia, id_horario) values(7, 6);
insert into horario_materia(id_materia, id_horario) values(8, 7);
insert into horario_materia(id_materia, id_horario) values(9, 8);
insert into horario_materia(id_materia, id_horario) values(10, 9);
insert into horario_materia(id_materia, id_horario) values(1, 10);

/*para ver que todo funciona, buscamos todas las materias con sus horarios*/
select hora, dia, materia.nombre_materia from horario
inner join horario_materia on horario_materia.id_horario = horario.id
inner join materia on materia.id = horario_materia.id_materia
;
select * from curso;
/*insertar materias en un curso*/
insert into materia_curso(id_materia, id_curso) values(1,1);
insert into materia_curso(id_materia, id_curso) values(2,1);
insert into materia_curso(id_materia, id_curso) values(3,1);
insert into materia_curso(id_materia, id_curso) values(4,1);
insert into materia_curso(id_materia, id_curso) values(5,1);
insert into materia_curso(id_materia, id_curso) values(6,1);
insert into materia_curso(id_materia, id_curso) values(7,1);
insert into materia_curso(id_materia, id_curso) values(8,1);
insert into materia_curso(id_materia, id_curso) values(9,1);
insert into materia_curso(id_materia, id_curso) values(10,1);

/*insertar roles*/
insert into rol(nombre_rol) values('user'); 
insert into rol(nombre_rol) values('admin'); 

/*ver todos los horarios que tiene un curso*/
select hora, dia, materia.nombre_materia from horario
left join horario_materia on horario_materia.id_horario = horario.id
inner join materia on materia.id = horario_materia.id_materia
inner join materia_curso on materia_curso.id_materia = materia.id
where materia_curso.id_curso = 1
order by horario.hora;

select hora, dia, horario_materia.id_materia from horario
left join horario_materia on horario_materia.id_horario = horario.id
left join materia on horario_materia.id_materia = materia.id
left join materia_curso on materia_curso.id_materia = materia.id
where materia_curso.id_curso =  1
;


/*una vez que el sistema esta listo, podemos registrar usuarios*/
insert into alumno(nombre, apellido, rol_id, curso_id) 
values('Gonzalo', 'Serrano', 1, 1);/*obviamente un alumno tiene mas datos que esos*/




/*insertando profesores.
la tabla de se llama alumno pero tmbien van a guardarse profesores*/
insert into alumno(nombre, apellido,rol_id ,user, password) 
values('Christian', 'Sandoval', 2, 'sandoval_1', 'contraseña');

/*buscar todos los que tengan rol de profesor*/
select * from alumno where rol_id = 2;


/*insertando materias a un profesor*/
select * from alumno where user = 'sandoval_1';
select * from materia;
insert into profesor_materia(id_profesor, id_materia) values(7, 1); /*historia*/
insert into profesor_materia(id_profesor, id_materia) values(7, 10); /*geografia*/

/*insertando materias a otro profesor*/
insert into profesor_materia(id_profesor, id_materia) values(4, 1); /*historia*/
insert into profesor_materia(id_profesor, id_materia) values(4, 10); /*geografia*/


/*ver las materias de un profesor:*/
select nombre_materia from materia
left join profesor_materia on profesor_materia.id_materia = materia.id
where profesor_materia.id_profesor = 4; /*todas las materias del profesor Sandoval*/

/*insertando notas a un alumno*/
insert into notas(id_alumno, id_materia, trimestre, calificacion) values(6, 3, 1, 5);

/*tabla 1, ver los alumnos que estan en mi materia y curso*/
select * from alumno a
inner join materia_curso mc on mc.id_curso = a.curso_id
left join materia m on m.id = mc.id_materia
where mc.id_curso = 1 and m.id = 1 and a.rol_id = 1/*id de la materia*/
;
/*tabla 2, ver los alumnos calificados por trimestre.*/
select user, nombre_materia, calificacion, trimestre from alumno
left join notas on notas.id_alumno = alumno.id
left join materia on materia.id = notas.id_materia
where alumno.curso_id = 1 and materia.id = 1 /*and trimestre = 1*/
;


/*notas de alumno*/
select calificacion, trimestre, nombre_materia from notas n
inner join materia m on m.id = n.id_materia
where n.id_alumno = 6;


/*notas de alumno, otra forma de buscar*/
select * from materia m
left join notas n on n.id_materia = m.id
where n.id_alumno = 6;



/*horarios de un profesor*/
select hora, dia, nombre_materia from horario h
left join horario_materia hm on h.id = hm.id_horario
left join profesor_materia mp on hm.id_materia  = mp.id_materia
left join materia on mp.id_materia = materia.id
where mp.id_profesor = 4
;
