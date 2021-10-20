class Persona {
    nombre: string; //por defecto, son publicas
    private edad: number;
    protected email: string
    constructor(nombre: string, edad: number, email: string) {
        this.nombre = nombre;
        this.edad = edadW
        this.email = email
    }
    getEdad () {
        return 'mi edad es ' + this.edad
    }
}

class Estudiante extends Persona {
    isActive: boolean
    constructor(nombre: string, edad: number, email: string) {
        super(nombre, edad, email)
        this.isActive = false
    }
    funcionPrueba() {
        this.email
    }
}


let mati = new Persona('matias', 29, 'mati@mail.com')
let fede = new Persona('fede', 29, 'fede@mail.com')
fede.email
mati.nombre //publico, lo puedo acceder desde fuera de la clase
mati.getEdad()
export {}