// Null
let nullExample: null = null; // Solo puede tomar valor "null"
let numberExample: number = null; // Pero el valor "null" podemos asignarlo 
                                // a cualquier variable
 
// Undefined
let undefinedExample: undefined = undefined; // Solo puede tomar valor "undefined"
let stringExample: string = undefined // Pero el valor "undefined" podemos asignarlo 
                                     // a cualquier variable

//proba cambiando las opciones del tsconfig.json
// "strictNullChecks": true

//Visual studio code siempre va a tomar el tsconfig de la carpeta donde tengas abierto
//tu proyecto, entonces, tal vez no veas los cambios

function noImplicitType(firstArg, secondArg) {
    console.log("First Argument: ", firstArg);
    console.log("Second Argument: ", secondArg);
  }
  
  noImplicitType(1,2);
  noImplicitType("Franco", "Etcheverri");
  noImplicitType(true, null);

  // Any
let ejemploAny: any = "Matias";
ejemploAny = 29;
ejemploAny = null;

// Unknown
let idk: unknown = "Matias";
idk = 29;
idk = null;

//en un principio parecen iguales

let anyValue: any = "Matias";
let unkValue: unknown = "Matias";

let str1: string = anyValue; // Todo OK, puedo asignarlo
// let str2: string = unkValue; // Error: Type 'unknown' is not assignable to type 'string'.

let str3: string = unkValue as string; // Explicit cast

anyValue.metodo(); // Todo OK, compila. Falla en tiempo de ejecución si el método no existe

// unkValue.method(); // Error: no lo permite

let iDontKnow: unknown = "typescript";

//ejercicio
let nowIKnow: string = iDontKnow; //utiliza el casteo explicito para asignarle a nowIKnow un string;

export {}