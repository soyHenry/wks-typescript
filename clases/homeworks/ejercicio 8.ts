//Intenta tipar una pluck function!
//TIP! Buscar la palabra reservada keyof y usar extends!
function pluck(arreglo, prop) {
    return arreglo.map((object) => {
        return object[prop]
    }) 
}