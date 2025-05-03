import { toast } from 'sonner';
import { motion } from 'motion/react';
import {  useState } from "react";
import { bounce } from './bounce';
import type {PropsWithChildren} from "react";
import type { Pokemon } from "@/types/pokemon";
import './style.css';
import { useCatchPokemon } from '@/services.ts/pokemonService';

interface WildPokemonProps extends PropsWithChildren {
  pokemon: Pokemon;
  availableBalls: number | undefined;
}

export function WildPokemon({ pokemon,  availableBalls }: WildPokemonProps) {
  const [isBounce, setIsBounce] = useState(false)
  const catchMutation = useCatchPokemon()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    if (!availableBalls) {
      toast.error('out of pokeballs')
      return
    }
    setIsBounce(true)
    setTimeout(()=> setIsBounce(false), 1600)
    catchMutation.mutate({ pokedex_number: pokemon.pokedex_number})
  }

  return (
    <motion.div
      className={`basis-auto max-w-[45%] m-6 pointer-custom-pokeball`}
      transition={bounce.transition}
      animate={ {y: isBounce ? bounce.animation : [] }}
    >
      <img
        className={`h-full max-h-[50vh]`}
        onClick ={(event) => handleClick(event)}
        src={`/pokemon_hq/${pokemon.uri}.png`
      }/>
    </motion.div>
  )
}