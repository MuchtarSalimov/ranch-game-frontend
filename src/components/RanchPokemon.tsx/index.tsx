import { useEffect, useState } from 'react';
import { motion } from "motion/react"
import type { Pokemon } from '@/types/pokemon';
import './style.css'
import { useWindowSize } from '@/hooks.tsx/useWindowSize';

interface RanchPokemonProps {
  numb: number;
  src: string;
  pokemon: Pokemon;
}

const MOVE_SCALING = 0.5;

export default function RanchPokemon({ numb, src, pokemon }: RanchPokemonProps) {
  const [position, setPosition] = useState<Array<number>>([0,0])
  const [windowWidth, windowHeight] = useWindowSize();

  const SCALE_X = 0.70*windowWidth;
  const SCALE_Y = 0.62*windowHeight;

  useEffect(()=>{
    // generate random initial initialPositions for pokemon in ranch
    const [x, y] = [Math.random(), Math.random()]
    setPosition([x, y]);
  }, [])

  const randomMove = (xSeed = position[0], ySeed = position[1]) =>{
    console.log('xseed', xSeed, 'yseed', ySeed)
    let [a, b] = [
      xSeed + MOVE_SCALING*Math.random() - 0.5*MOVE_SCALING,
      ySeed + MOVE_SCALING*Math.random() - 0.5*MOVE_SCALING]
      console.log('a', a, 'b', b)
    if (a < 0){ a = 0 }
    if (a > 1) { a= 1}
    if (b < 0){ b = 0 }
    if (b > 1) { b= 1}
    console.log('a', a, 'b', b)
    setPosition([a, b])
  }

  useEffect(()=>{
    if(position[0] > 1 || position[1] > 1){
      randomMove(0.5,  0.5)
    }
  },[windowWidth, windowHeight])

  const initialPositionClass = `
    absolute
  `;
  const idString = `ranch-pokemon-${numb}`;

  const runMotion = (event: React.MouseEvent<HTMLElement>) =>{
    event.preventDefault();
    randomMove(position[0], position[1])
  }

  if (typeof numb !== 'number') {
    console.log('error in', numb)
    return (
      <p>Loading...</p>
    )
  } else {
    return (
      <motion.div id={idString}
        className={initialPositionClass}
        onClick={runMotion}
        animate={{
          x: Math.floor(SCALE_X*position[0]),
          y: Math.floor(SCALE_Y*position[1])
        }}
        transition={{
          duration: 0.5, 
          type: "spring", 
          stiffness: 100 
        }}
        >
        <motion.section
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true}}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration:  1, bounce: 0.5 },
            delay: Math.random()*1.5,
        }}
          >
            <img src={src} className={`h-50 w-50 shadow`}/>
            <p className={`text-4xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]`}>lvl {pokemon.level}</p>
        </motion.section>
      </motion.div>

    )
  }
}
