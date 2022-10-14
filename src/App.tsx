import { useEffect, useState } from 'react'
import './App.css'
import { HangedImage } from './components/HangedImage'
import { letras } from './helpers/letras'
import { obternerPalabras } from './helpers/obtenerPalabras'

function App() {

  const [palabras, setPalabras] = useState(obternerPalabras())
  const [ocultarPalabra, setOcultarPalabra] = useState("_ ".repeat(palabras.length))
  const [intentos, setIntentos] = useState(0);
  const [gano, setGano] = useState(false);
  const [perdio, setPerdio] = useState(false);


  //El jugador perdio
  useEffect(() =>{
    if(intentos === 9){
      setPerdio(true);
    }
  }, [intentos]);

  // El jugador gano

  useEffect(() => {
    const currentOcultarPalabra = ocultarPalabra.split(" ").join("");
    if(currentOcultarPalabra === palabras){
      setGano(true);
    }
  }, [ocultarPalabra]);
  

  //validacion de las Palabras

  const validarPalabras = (letra: string) =>{
    if(gano) return;
    if(perdio) return;

    if(!palabras.includes(letra)){
      setIntentos(Math.min(intentos + 1, 9))
      return;
    }

    const ocultarPalabraArray = ocultarPalabra.split(" ")

    for (let i = 0; i< palabras.length; i++){
      if(palabras[i] === letra){
        ocultarPalabraArray[i] = letra
      }
    }
    setOcultarPalabra(ocultarPalabraArray.join(" "))
  };

  const reiniciarJuego = () =>{
    const nuevaPalabra = obternerPalabras();

    setPalabras(nuevaPalabra);
    setOcultarPalabra("_ ".repeat(nuevaPalabra.length));
    setIntentos(0);
    setGano(false);
    setPerdio(false);
  }

  return (
    <div className="text-center">

      {/*Imagenes*/}
      <div className="mx-auto flex flex-col justify-center items-center">
        <HangedImage imagenNumero={intentos} />
      </div>


      {/* Palabra Oculta */}
      
      <h3 className="font-bold text-2xl my-4 text-blue-700">
        {ocultarPalabra}
      </h3>

      {/* Contador ded Intentos */}
      <h3 className="font-bold text-2xl my-4 text-blue-700">
        Attempts in the game : {intentos}
      </h3>


      {/* Mensaje si Perdio */}
      {perdio ? (
      <h3 className="font-bold text-2xl my-4 text-red-600">
        😥 Sorry you lost, The word is:{palabras}
      </h3>
      ) : (
        ""
      )}

      {/* Mensaje si Gano */}
      {gano ? (
      <h3 className="font-bold text-2xl my-4 text-green-500">
         !!! 🥳 Congratulations you have won 🥳 !!!    
      </h3>
      ) : (
        ""
      )}
    

      {/* Teclado */}
      {letras.map((letra) =>(
        <button onClick={() => validarPalabras(letra)} key={letra} className="bg-blue-200 p-4 rounded-full shadow-md m-2">{letra}</button>
      ))}

      <br/>

      {/* Boton de Nuevo Juego */}

      <button onClick={reiniciarJuego}        
        className="bg-blue-700 py-4 px-6 rounded-full text-white font-bold text-xl"
      >
        ¿Nuevo juego?
      </button>

    </div>
  )
}

export default App
