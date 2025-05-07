import { createFileRoute } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react';
import type { Pokemon } from '@/types/pokemon';
import { Login } from '@/components/Login';
import { useWindowSize } from '@/hooks/useWindowSize';
import { WildPokemon } from '@/components/WildPokemon';
import { usePokeBallCount, useWildPokemon } from '@/services.ts/pokemonService';
import { AvailableBalls } from '@/components/AvailableBalls.tsx';
import { AuthContext } from '@/hooks/UserProvider';

export const Route = createFileRoute('/wilderness')({
  component: () =>  <Wilderness />,
})

const verticalClass =   `relative h-[calc(100vh-80px)] bg-[url(/forest.jpg)] bg-cover brightness-90 justify-evenly flex flex-col items-center`
const horizontalClass = `relative h-[calc(100vh-80px)] bg-[url(/forest.jpg)] bg-cover brightness-90 justify-evenly flex flex-row items-end`

function Wilderness() {
  const { user } = useContext(AuthContext)
  const [width, height] = useWindowSize();
  const [orientationBasedClass, setOrientationBasedClass] = useState((height > 1.3*width) ? verticalClass : horizontalClass)

  const pokeBallCountQuery = usePokeBallCount()

  useEffect(() => {
    setOrientationBasedClass((height > 1.3*width) ? verticalClass : horizontalClass)
  }, [width, height])
  
  const wildPokemonQuery = useWildPokemon()

  if (!user.token) {
    return <Login/>
  }

  return (
    <div className={orientationBasedClass}>
      { wildPokemonQuery.data && 
        // temp - swap out this part for real data
        wildPokemonQuery.data
        .map((pokemon: Pokemon, index: number)=>{
          return <WildPokemon key={index} pokemon={pokemon} availableBalls={pokeBallCountQuery.data}/>
        })
      }
      <AvailableBalls ballCount={pokeBallCountQuery.data} />
    </div>
  )
}