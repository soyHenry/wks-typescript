let array = [1, 2, 3, 4]
let arrayStrings = ['a', 'b', 'c']

// function firstElement(arr: any[]) {
//     return arr[0];
//   }

  	
// function firstElement<Type>(arr: Type[]): Type { // T, V U
//     return arr[0];
//   }
// let elemento =  firstElement(array) //implicito
// let elementoString =  firstElement<string>(arrayStrings) //explicito

function merge<U extends object, V extends object>(obj1: U, obj2: V) {
    return {
      ...obj1,
      ...obj2
    };
  }

  /*
  actions en redux, las acciones son funciones genericas!
  axios.post
  axios.get tambien son funciones genericas
  response.data ---> informacion de data es T
  axios.get<Persona> ---> response.data --> va a estar persona, y nos va
  a dar el tipado
  useState de react, TAMBIEN utiliza generic functions!
  */
  
  merge({name: "Franco"}, {age: 25});
  merge({name: "Franco"}, 25); // no me advierte