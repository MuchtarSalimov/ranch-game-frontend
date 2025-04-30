import type { Pokemon } from '@/types/pokemon';
import './style.css'

interface RanchPokemonProps {
  numb: number;
  src: string;
  pokemon: Pokemon;
}

export default function RanchPokemon({ numb, src, pokemon }: RanchPokemonProps) {
  const className = `h-50 w-50 shadow`
  const wrapper = `absolute pok-${numb}`
  const text =`text-4xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]`

  if (typeof numb !== 'number') {
    console.log('error in', numb)
    return (
      <p>Loading...</p>
    )
  } else {
    return (
      <div className={wrapper}>
            <img src={src} className={className}/>
            <p className={text}>lvl {pokemon.level}</p>
      </div>
    )
  }
}
