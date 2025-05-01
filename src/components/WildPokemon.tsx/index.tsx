import type { Pokemon } from "@/types/pokemon";
import type { PropsWithChildren } from "react";

interface WildPokemonProps extends PropsWithChildren {
  pokemon: Pokemon;
  className: string;
}


export function WildPokemon({ pokemon, ...props }: WildPokemonProps) {
  return (
    <div className={`${props.className}`}>
      <img className={`h-full`} src={`/pokemon_hq/${pokemon.uri}.png`}></img>
    </div>
  )
}