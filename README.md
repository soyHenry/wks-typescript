# Henry Workshop - Typescript

## Overview

En este workshop vamos a crear una aplicación utilizando React, Redux y Typescript, para ello usaremos el script de Create React App para generar un boilerplate inicial y sobre el modificar lo necesario para elaborar la aplicación que se describirá a continuación.

## Setup Inicial

Para crear la estructura de proyecto se ejecuto el comando

```bash
  npx create-react-app wks-typescript --template typescript
```
Si quieren iniciarlo desde cero pueden volver a hacerlo o directamente forkear este repositorio y partir desde allí. De elegir esta segunda opción no olviden de realizar el `npm install` para instalar las dependencias necesarias para correr el proyecto.

Una vez realizado esto pueden ver como si ejecutan `npm start` les va a correr una aplicación base de forma local.

Vamos a borrar por completo el contenido de la carpeta src para comenzar de cero con nuestros componentes.

## WARM UP


### Componentes

Vamos a crear nustro componente principal como ya sabíamos en React, sin nada nuevo por lo que simplemente crearemos el archivo `index.tsx` dentro de la carpeta `src` con el siguiente código:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

function App {
    return (<div>Henry Workshop - Typescript</div>);
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
```

#### Props

Intentemos ahora pasarle como hacíamos en React una prop a ese componente por ejemplo una llamada title que contenga la palabra "Typescript".

```javascript
function App({title}) {
    return (
      <div>Henry Workshop - {title}</div>
    );
}

ReactDOM.render(
  <App title="Typescript"/>,
  document.querySelector('#root')
);
```

Si vamos a nuestra aplicación veremos lo siguiente:

<p align="center">
  <img src="./img-screens/1.png" />
</p>

En Typescript necesitamos informar los tipos de datos de las propiedades que va a recibir cada componente, para ello utilizaremos una `interface`. Adicionalmente es una buena práctica si utilizamos componentes funcionales determinar el tipo de dato que va a retornar dicha función y no dejarlo libre para que Typescript haga la inferencia de datos. En este caso lo que estamos retornando es un JSX por lo que agregamos `JSX.Element`.

```javascript
interface AppProps {
  title: string;
}

function App({title}:AppProps): JSX.Element { // Sin el destructuring sería App(props:AppProps)
  ...
}

// O con otra sintaxis
const App = ({title}: AppProps): JSX.Element => {
  ...
}
```

¿Qué ocurriría si existen propiedades opcionales que pueden pasarse o no? Más adelante veremos como solucionar este problema pero si prueban verán que tendremos un problema al momento de compilar. Si sacamos la prop title del llamado al componente tendremos el siguiente error: `Property 'title' is missing in type '{}' but required in type 'Readonly<AppProps>'.`

#### State (Class vs Hooks)

Si utilizamos `Hooks` el código va a quedar más sencillo ya que no vamos a tener que preocuparnos por definir la estructura de tipos que debe seguir el estado del componente, simplemente utilizamos el hook de `useState` al igual a como ya estábamos acostumbrados.

```javascript
function App({title}:AppProps) {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h3>Henry Workshop - {title}</h3>
      <hr></hr>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
      <br></br>
      <span>{counter}</span>
    </div>
  );
}
```

Por el contrario si hacemos el mismo componente pero utilizando `Class` como ya sabíamos de React nos quedaría algo así:

```javascript
class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
      super(props);
      this.state = {counter: 0};
  }

  onIncrement = ():void => {
    this.setState({counter: this.state.counter + 1});
  };

  onDecrement = ():void => {
    this.setState({counter: this.state.counter - 1});
  };

  render() {
    return (
      <div>
        <h3>Henry Workshop - {this.props.title}</h3>
        <hr></hr>
        <button onClick={this.onIncrement}>Increment</button>
        <button onClick={this.onDecrement}>Decrement</button>
        <br></br>
        <span>{this.state.counter}</span>
      </div>
    );
  }
}
```

Si analizamos el código es totalmente válido para una aplicación de React, pero al parecer Typescript no estaría muy de acuerdo con eso, ya que al intentar levantar la aplicación nos arrojará este error:

<p align="center">
  <img src="./img-screens/2.png" />
</p>

Lo que nos está faltando para evitar este error es declarar la estructura de tipos del estado del componente de la siguiente forma:

```javascript
interface AppState {
  counter: number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
      super(props);
      this.state = {counter: 0};
  }

  ...
}
```

Existe otra posibilidad para simplificar la sintaxis del código en el caso de utilizar `Class` que es la siguiente. Sin definir la interfaz del state podemos sobreescribir state dentro del componente:

```javascript
class App extends React.Component<AppProps, AppState> {
  state = {counter: 0};

  ...
}
```

## Enunciado

Lo anterior fue simplemente para practicar el armado de un componente ya sea funcional o de clase pero ahora lo que vamos a intentar hacer es una aplicación utilizando también Redux que consuma una API externa (https://jsonplaceholder.typicode.com/) y muestre los resultados obtenidos. Por lo tanto los componentes que habíamos hecho hasta recién lamentablemente no van a servirnos más por lo que pueden ya eliminarlos y comenzar nuevaemente de cero.

<p align="center">
  <img src="./img-screens/3.jpeg" />
</p>

### Dependecias

En las dependencias del package.json del boilerplate ya van a estar incluidas `redux`, `react-redux`, `redux-thunk` y `axios` por lo que simplemente con el `npm install` del comienzo ya alcanzaría, pero si comienzan desde cero en un proyecto separado recuerden que deben instalar las mismas.

```bash
  npm install --save redux react-redux redux-thunk axios
```

#### Component App

Crearemos una carpeta llamada `components` para poner allí todo los componentes que vayamos a necesitar para la aplicación.

Comenzaremos con el componente principal de la aplicación al que llamaremos `App`, como ya les explicamos anteriormente como crearlos no tendrán el código para esta parte... tendrán que hacerlo ustedes. La idea es que por el momento el componente simplemente retorne un `<div>` con el texto que deseen.

Ahora hagamos que en nustro `index.tsx` se importe dicho componente para poder utilizarlo (Recordar exportar el componente en `App.tsx` para poder hacer este paso):

```javascript
import App from './components/App'; // Importante no poner la extensión .tsx sino arrojara un error

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
```

#### Store

Crearlo en un archivo separado dentro de una carpeta llamada `store` e importarlo para poder utilizarlo. Ya saben como hacerlo, así que no habrá código acá. Recuerden también agregarle redux-thunk para poder realizar los request desde las actions creators.

#### Reducer

Recuerden también de generar un archivo separado para el reducer que utilizará la app, por prolojidad conviene crear una carpeta nueva `reducers` y allí agregar el archivo `index.ts`. Inicialmente el estado debe contener un objeto con una única propiedad `counter` con valor 1.

Si lo hacemos como ya sabíamos de React:

```javascript
const initialState = {
  counter: 1
}

export default function reducer(state = initialState, action) {
  return state;
}
```

Nos va a arrojar el siguiente error:

<p align="center">
  <img src="./img-screens/2.png" />
</p>

Nuevamente debido al chequeo de tipos que realiza Typescript vamos a tener que hacer algunos ajustes a nuestro reducer. Debemos definir las interfaces para nuestro estado y para nuestras actions. Podemos hacerlo directaente en ese mismo archivo del reducer.

```javascript
interface stateI {
  counter: number
}

const initialState: stateI = {
  counter: 1
}

interface actionI {
  type: string
}

export default function reducer(state: stateI = initialState, action: actionI) {
  return state;
}
```

Para que lo tengan en cuenta a veces se suele tener un archivo separado para definir las interfaces y simplemente importarlas donde las necesitemos, ya que es probable que algunas tengamos que reutilizarlas en más de un archivo. Quizás más adelante tengamos que hacer dicho cambio.

#### Provider

Comenzaremos configurando el componente `<Provider>` dentro de nuestro `index.tsx` para permitir el acceso al store desde cualquier componente de la aplicación:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <h1>Henry</h1>
  </Provider>,
  document.querySelector('#root')
);
```

¿Todo OK? Nop, Typescript otra vez...

<p align="center">
  <img src="./img-screens/4.png" />
</p>

Para que el módulo de `react-redux` funcione correctamente con Typescript debemos adicionalmente instalar un módulo separado en donde están definido los tipos de datos. Si observamos en el mensaje de error incluso nos dice como hacerlo.

```bash
  npm i --save-dev @types/react-redux
```

#### Action Creators

Crearemos una carpeta denominada `actions` y dentro el archivo `index.ts`. Allí colocaremos todo el código relacionado con las action creators.

Primero vamos a imortar `axios` ya que lo vamos a necesitar para hacer los request a la API externa. Luego creremos una action creator que se encargue de ir a buscar todos las publicaciones (Las llamaremos `posts`) de la API:

```javascript
import axios from 'axios';

const url = "https://jsonplaceholder.typicode.com/posts"

export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await axios.get(url);
    dispatch({
      type: "FETCH_POSTS",
      payload: response.data
    })
  };
};
```

<p align="center">
  <img src="./img-screens/6.png" />
</p>

<p align="center">
  <img src="./img-screens/7.jpeg" />
</p>

A no desesperar, nuevamente lo que está ocurriendo es que debemos indicarle la estructura de datos al dispatch pero ahora ¿cómo hacemos si no conocemos exactamente como está implementada por dentro?

Por suerte podemos directamente del módulo de `redux` importar la estructura de tipos del dispatch:

```javascript
import { Dispatch } from 'redux';

export const fetchPosts = () => {
  return async (dispatch: Dispatch) => {
    ...
  };
};
```

¿Qué estructura de datos tiene la respuesta al llamado a la API?

De antemano no podemos saberlo por lo que va a ser del tipo `any`. Por otro lado dentro del objeto que estamos despachando tampoco indicamos el tipo de dato ni del `type` ni del `payload`. El programa está asumiendo que vamos a pasarle un `string` y `any` respectivamente.

Vamos a mejorar un poco esto definiendo la estructura que debería tener la respuesta al GET. Para eso veamos que nos está devolviendo dicho endpoint:

<p align="center">
  <img src="./img-screens/8.png" />
</p>

Como pueden observar en la imagen deberíamos tener:
 * userId
 * id
 * title
 * body

Por lo tanto crearemos una interfaz con esa estructura (Omitiremos el `userId` ya que no lo usaremos en nuestra aplicación):

```javascript
interface Post {
  id: number;
  title: string;
  body: string;
}
```

Y ahora debemos aclarar que el método get de axios espera recibir algo con esa estructura (Un arreglo de `Post`):

```javascript
...
  const response = await axios.get<Post[]>(url);
...
```

Ahora crearemos una forma de tener de forma prolija todos los tipos de las actions que vamos a querer despachar. En este caso para ello crearemos un `Enum` dentro de un nuevo archivo `types.ts` en la carpeta `actions`.

```javascript
export enum ActionTypes {
  fetchPosts,
  ...
}
```

Debajo de `fetchPosts` iremos completando con los types que queramos poder tener dentro de nuestras actions.

__Explicación sobre el funcionamiento de enum__: Por defualt si por ejemplo a fetchPosts no le indicamos ningún valor va a asignarle el número 0 y así sucesivamente hacía abajo aumentando el valor del número como si fuera un índice. Por el contrario si quisiéramos que si o si tenga un valor en formato texto deberíamos ponerlo como `fetchPosts = "FETCH_POSTS"` pero a nosotros no nos va a interesar que valor tenga sino que redux pueda identificar uno de otros por lo que lo dejaremos como estaba más arriba.

Ahora importamos el `ActionTypes` en el `index.ts` de las actions y lo reemplazamos por el string que teniamos hardcodeado.

```javascript
import { ActionTypes } from './types';

...

export const fetchPosts = () => {
  return async (dispatch:  Dispatch) => {
    const response = await axios.get<Post[]>(url);
    dispatch({
      type: ActionTypes.fetchPosts,
      payload: response.data
    })
  };
};
```

__Paso "opcional"__: Es una buena práctica que va a mejorar un poco el chequeo de tipos pero no necesariamente deben hacerlo en sus aplicaciones de typescript pero en este workshop haganlo porque lo necesitaremos por como vamos a implementar algunas cuestiones más adelante.

Crearemos una nueva interfaz para describir el objeto (action) dentro del dispatch:

```javascript
...

interface FetchPostAction {
  type: ActionTypes.fetchPosts;
  payload: Post[];
}

export const fetchPosts = () => {
  return async (dispatch:  Dispatch) => {
    const response = await axios.get<Post[]>(url);
    dispatch<FetchPostAction>({
      type: ActionTypes.fetchPosts,
      payload: response.data
    })
  };
};
```

Esto nos va a asegurar que en el dispatch estemos pasando un objeto con la estructura correcta.

#### Reducer

Volvemos a trabajar un poco más sobre nuestro reducer, pero lo que teniamos antes del `counter` ya no va a servirnos por lo que lo sacaremos y esta vez configuraremos los reducers basandonos en la idea que más adelante tendremos más por lo tanto utilizaremos el combineReducers.

Algunos cambios que tienen que hacer:

  * Opcional: cambiar el import en store para que se llame `reducers` (en plural) porque utilizaremos un combineReducers ahora. Esto simplemente es para ser más representativos con los nombres que utilizamos pero si no lo cambian va a seguir funcionando correctamente: `import { reducers } from '../reducers/index';`
  * Modificaremos el archivo de reducer momentaneamente por lo siguiente:

```javascript
import { combineReducers } from 'redux';

export const reducers = combineReducers({
  counter: () => 1
});
  ```

Ahora vamos vamos a modificarlo para adaptarlo a la aplicación de "Posts". Primero vamos a importar la interfaz de Post desde actions para ello no olviden agregarle un `export`. Por otro lado crearemos un archivo `posts.ts` en la carpeta `reducers`.

```javascript
import { Post, FetchPostAction } from '../actions';

export const postsReducer = (
  state: Post[] = [],
  action: FetchPostAction
) => {

};
```

Ahí estamos definiendo nuestro reducer para los Posts y describiendo que estructura de datos debería tener tanto el state como la action.

¿Qué problema podría llegar a tener esa implementación? Bueno, piensen que pasaría si la action que llega no es estrictamente igual a la de `FetchPostAction`. Más adelante veremos como mejorar esto, por ahora dejemoslo así que va a funcionar.

Ahora agregaremos la lógica dentro del reducer. Vamos a tener que importar también los `ActionTypes` para hacer el switch o if's dentro del reducer:

```javascript
import { Post, FetchPostAction } from '../actions';
import { ActionTypes } from '../actions/types';

export const postsReducer = (
  state: Post[] = [],
  action: FetchPostAction
) => {
  switch (action.type) {
    case ActionTypes.fetchPosts:
      return action.payload;
    default:
      return state;
  }
};
```

Ahora vamos a meter este reducer que acabamos de crear dentro del combineReducers en nuestro archivo `index.ts` de la carpeta `reducers`:

```javascript
import { combineReducers } from 'redux';
import { postsReducer } from './posts';

export const reducers = combineReducers({
  posts: postsReducer
});
```

__Recordatorio__: el estado de redux cuando usamos un combineReducers quedaría de la siguiente forma

```javascript
{
  todos: [Todo, Todo] // Donde Todo sería un objeto del tipo Todo
}
```

Podemos también validar la estructura de datos de nuestro store, nuevamente este paso es opcional, ya que va a funcionar de todas formas pero le damos más robustez a nuestro código al hacerlo. Para esto crearemos una interfaz que va a representar la estructura de datos de todo nuestro store.

```javascript
import { combineReducers } from 'redux';
import { postsReducer } from './posts';
import { Post } from '../actions';

export interface StoreState {
  posts: Post[];
}

export const reducers = combineReducers<StoreState>({
  posts: postsReducer
});
```

#### Conectar componente App con Redux

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { Post, fetchPosts } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  posts: Post[];
  fetchPosts(): any;
}

function App(props:AppProps) {
  return (
    <div>
      Hello Henrys
    </div>
  );
}

const mapStateToProps = (state: StoreState): {posts: Post[]} => {
  return {
    posts: state.posts
  };
}

export default connect(
  mapStateToProps,
  { fetchPosts }
)(App)
```

#### Mostrar algun Post

En primer lugar vamos a agregar el `useEffect` que ya conocemos para despachar la acción al renderizar el componente:

```javascript
useEffect(() => {
  props.fetchPosts();
}, [])
```

Si observamos las request enviadas al abrir nuestra aplicación veremos que efectivamente el request para solicitar los POSTs a la API están funcionando:

<p align="center">
  <img src="./img-screens/9.png" />
</p>

__OPCIONAL__: Vamos a configurar redux devtools para poder ver y debuggear nuestra aplicación.

```javascript
import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from '../reducers/index';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
```

<p align="center">
  <img src="./img-screens/10.png" />
</p>

Recuerden que el nombre de la acción figura como un 0 debido a que utilizamos un Enum con sus valores por defecto, si ustedes le asignaron un String van a ver dicho nombre allí.

Ahora que sabemos que funciona hagamoslo de la forma correcta, a partir de un botón que al hacerle click recién allí despache dicha acción.

```javascript
function App(props:AppProps) {
  return (
    <div>
      <button onClick={props.fetchPosts}>FETCH POSTS!</button>
      {
        props.posts.map((post: Post) => {
          return (
            <div key={post.id}>
              {post.id}) {post.title}
            </div>
          );
        })
      }
    </div>
  );
}
```

Con eso ya tendríamos un listado de nuestros Posts

<p align="center">
  <img src="./img-screens/11.png" />
</p>


#### Eliminar algun Post

Para esta funcionalidad no habrá ningún tipo de ayuda, en función de todo lo que vimos hasta ahora deberán agregar un botón por cada Post para que al hacerle click elimine dicho post del listado total.

<p align="center">
  <img src="./img-screens/12.jpg" />
</p>

__AYUDA__: Para cuando tengan que en el reducer aceptar más de un tipo de action pueda hacer una unión utilizando al caracter `|`. Por ejemplo:

```javascript
export const postsReducer = (
  state: Post[] = [],
  action: FetchPostAction | DeletePostAction
) => {
  switch (action.type) {
    ...
  }
};
```

¿Pero que pasaría si se agregan muchos types distintos? Crecería mucho esa parte del código y quedaría poco legible. Por lo que hay una mejor forma de hacerlo, encapsularemos esa lógica dentro del archivo `types.ts` dentro de `actions`:

```javascript
import { FetchPostAction, DeletePostAction } from './index';

export enum ActionTypes {
  fetchPosts,
  deletePost
}

export type Action = FetchPostAction | DeletePostAction;
```

Por lo que nuestro reducer ahora quedaría así:

```javascript
import { Post } from '../actions';
import { ActionTypes, Action } from '../actions/types';

export const postsReducer = (
  state: Post[] = [],
  action: Action
) => {
  switch (action.type) {
    ...
  }
};
```

#### Extra: Loading

Adicionalmente para mejorar un poco la UX de nuestra paǵina sería bueno tener al menos una palabra "Loading..." cuando el usuario le de click al botón de "FETCH POSTS!" por si el request demora un poco.

Implementar dicha funcionalidad con lo visto hasta el momento.

<p align="center">
  <img src="./img-screens/13.jpg" />
</p>
