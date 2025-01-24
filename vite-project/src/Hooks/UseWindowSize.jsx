import { useEffect, useState } from "react";

export function UseWindowSize(){
    const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});
    
      // How to create Custom Hooks
      useEffect(() => {
        window.addEventListener("resize", ()=> {
          setWindowSize({width: window.innerWidth, height: window.innerHeight});
        })
      }, [])

    return windowSize;
}