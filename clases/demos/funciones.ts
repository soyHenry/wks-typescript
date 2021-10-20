
//function nombreMiFuncion(parametroUno: TIPADO_PARAMETRO_UNO, ...): tipadoReturn
// function suma(a: number, b: number): number {
//     return a + b
// }

// function suma(a: number | string, b: number | string): number | string | void {
//     if(typeof a === "number" && typeof b === "number") return a + b
//     if(typeof a === "string" && typeof b === "string") return a + b
// }

function suma(a: string | number, b: string | number): number {
    if(typeof a === "string") {
        a = parseInt(a)
    }
    if(typeof b === "string") {
        b = parseInt(b)
    }
    return a + b
}

function consologea(): void {
    console.log('algo')
    //react cuando seteemos un estado!
}

	
function throwError(msg: string): never {
    throw new Error(msg);
    console.log('un valor')
  }

let resultado = suma(2, 2)
