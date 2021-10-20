interface Persona {
    nombre: string;
    apellido: string;
    edad: number;
    hobbies: Hobby[]
}
interface Hobby {
    nombre: string
}

interface Estudiante extends  Persona {
    // nombre: string;
    // apellido: string;
    // edad: number;
    estaActivo?: boolean;
    saluda: (a: string) => void
}

let matias: Persona = {
    nombre: 'matias',
    apellido: 'lamela',
    edad: 29,
    hobbies: [{nombre: 'leer'}]
}

matias.hobbies[0].nombre

let franco: Estudiante = {
    nombre: 'franco',
    apellido: 'etcheverri',
    edad: 27,

    saluda: (a:  string) => {console.log('hola')},
    hobbies: []
}
franco.estaActivo //undefined o booleano