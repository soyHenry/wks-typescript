//const/let/var nombreMiVariable : miTipado = asignacion

let nombre = 'matias' //infiere mi tipado.

let otroNombre: string = 'matias' //explicito, donde le vamos a decryption
//que tipado queremos.

let edad: number = 29

let flotante: number = 2.5

let verdadero: boolean = true

verdadero = false

enum Fases {
    Primero, //0
    CualquierValor, //1
    Tercero //2
}

Fases.CualquierValor // 1

enum userActions {
    fetchUser = "FETCH_USER", //FETCH_USER
    postUser = "POST_USER", //POST_USER
}

userActions.fetchUser // comparar en un switch en el reducer de redux

verdadero = 2

nombre = 29 //error antes de la compilacion

// cannot read property map of undefined
let objeto = {
    nombre: 'matias',
    apellido: 'lamela'
}
//funcion asincronica,
//pidiendo a mi rest API mis productos,
// [] ---> undefined o en el momento que tengo mis productos que es un arreglo

// (e) => {e.target.value} --> e: Event, evento mouseClick, keyDown

// Request


