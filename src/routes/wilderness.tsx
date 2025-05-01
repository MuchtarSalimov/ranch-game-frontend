import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import type { Pokemon } from '@/types/pokemon';
import { useWindowSize } from '@/hooks.tsx/useWindowSize';
import { WildPokemon } from '@/components/WildPokemon.tsx';
import { usePokeBox } from '@/services.ts/pokemonService';
import { AvailableBalls } from '@/components/AvailableBalls.tsx';

export const Route = createFileRoute('/wilderness')({
  component: Wilderness,
})

const verticalAlign = `justify-evenly items-center align-center`
const horizontalAlign = `justify-evenly items-end align-center`

function Wilderness() {
  const [width, height] = useWindowSize();
  const [directionGrid, setDirectionGrid] = useState(height > width ? `flex-col ${verticalAlign}` : `flex-row ${horizontalAlign}`)

  useEffect(() => {
    setDirectionGrid(height > 1.3*width ? `flex-col ${verticalAlign}` : `flex-row ${horizontalAlign}`)
  }, [width, height])
  
  // temp lines for data visualization while mocking this up
  // { status, data, error, isFetching }
  const { data } = usePokeBox()
  // temp lines for

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)] text-center relative">
      <div className={`h-[80vh] w-[80vw] bg-[url(/forest.jpg)] brightness-90 bg-cover flex ${directionGrid} gap-16 p-[5%]`}>
        {data && 
          data.slice(0,3).map((pokemon: Pokemon, index: number)=>{
            return <WildPokemon key={index} className={`basis-auto max-w-[45%]`} pokemon={pokemon}/>
          })
        }
      </div>
      <AvailableBalls/>
    </div>
  )

}