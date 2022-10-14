let palabras: string[] = [
    "REACTJS",
    "DEVELOPER",
    "TAILWIND",
    "FUNCTION",
    "COMPONENTS",
    "VARIABLE",
    "BUSSINESS",
    "PROJECTS",
    "HTML",
    "JAVASCRIPT"
  ];

export function obternerPalabras(){
    
    const randomIndex = Math.floor(Math.random() * palabras.length)
    return palabras[randomIndex]
}