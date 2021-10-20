//Typescript va a inferir nuestra variable en la primer asignacion
let variableInferida = 2;

//O podemos definir explicitamente el tipado en el momento de su declaracion
let variableExplicita: number = 2;

//si hacemos hover sobre resultado, vemos que visual studio code infiere que "resultado"
//es un number, porque la suma de dos numeros es SIEMPRE un numero.
let resultado = variableExplicita + variableInferida

//completar el tipado correspondiente para cada variable

let unString: null = 'mati';

let unNumber: null = 2;

let unBoolean: null = true;

let unNull: undefined = null; //que pasa aca?

let unUndefined: null = undefined //y aca?

	
// Enum
enum Fases {
    Primera, //0
    Segunda, //1
    Tercera //2
}
let phase: Fases = Fases.Primera; // 0

enum userActions {
    fetchUser = "FETCH_USER", // "FETCH_USER"
    postUser = "POST_USER" // "POST_USER"
}


export {}