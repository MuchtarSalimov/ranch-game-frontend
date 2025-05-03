import { useEffect, useState } from 'react';
import { motion } from "motion/react"
import { nudge } from './movement';
import type { Pokemon } from '@/types/pokemon';
import './style.css'
import { useWindowSize } from '@/hooks.tsx/useWindowSize';

interface RanchPokemonProps {
  src: string;
  pokemon: Pokemon;
}

export default function RanchPokemon({ src, pokemon }: RanchPokemonProps) {
  // position is a pair of coordinates in a 1x1 grid for easy scaling
  const [position, setPosition] = useState<Array<number>>([Math.random(), Math.random()])
  const [windowWidth, windowHeight] = useWindowSize();

  // numbers here are relative sizes of the ranch to the window
  const approx_ranch_width = 0.70*windowWidth;
  const approx_ranch_height = 0.62*windowHeight; 

  useEffect(()=>{
    const repeat = () =>{
      const newDelay = 5000 + 30000*Math.random();
      setTimeout(()=>{
        if (Math.random() < 0.4){
          randomMove(0.1);
        }
        repeat()
      }, newDelay)
    }
    repeat()
  }, [])

  // move the pokemon. supply coordinates if you want to reset the position to a new position before moving it.
  const randomMove = (scaling_factor: number) =>{
    setPosition(nudge(position[0], position[1], scaling_factor))
  }

  const runMotion = (event: React.MouseEvent<HTMLElement>) =>{
    event.preventDefault();
    randomMove(0.3)
  }

  if (typeof src !== 'string') {
    return (
      <></>
    )
  } else {
    return (
      <motion.div
        className={'absolute'}
        onClick={runMotion}
        animate={{
          x: Math.floor(approx_ranch_width*position[0]),
          y: Math.floor((approx_ranch_height*(0.5 + 0.5*position[1]))),
        }}
        transition={{
          duration: 0.8, 
          bounce: 0.5,
        }}
        >
        <motion.section
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true}}
          transition={{
            duration: 0.5,
            scale: { type: "spring", visualDuration:  0.5, bounce: 0.5 },
            delay: Math.random()*3,
        }}
          >
            <img title={`lvl ${pokemon.level} ${pokemon.nickname? pokemon.nickname : pokemon.species}`}src={src} className={`max-w-[10vh] 2xl:max-w-[250px] shadow`}/>
        </motion.section>
      </motion.div>

    )
  }
}
