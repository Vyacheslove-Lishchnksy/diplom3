import { JSX, useEffect, useRef, useState } from "react";
import useOutsideClick from "./useOutsideClick";

export interface IUseModalArguments {
    text: string;
    isVisible: () => boolean;
}

export const useModal = ({text, isVisible: getIsVisible}: IUseModalArguments) => {
    

    return () => { 
        const ref = useRef(null);
        const [isVisible, setIsVisible] = useState(false);
        useEffect(() => {
            setIsVisible(getIsVisible())
        }, [getIsVisible()]) 
        useOutsideClick(ref, () => {
            setIsVisible(false);
        }, [])

        

        
        return (
         <section className={`p-10 absolute bg-gray-950 rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isVisible
        ? "" : "hidden"
      }`}
      ref={ref}>
        {
          text
        }
      </section>)};
}