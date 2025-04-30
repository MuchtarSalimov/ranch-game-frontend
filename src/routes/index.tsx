import { createFileRoute } from '@tanstack/react-router'
// import { points } from '../lib/points';
import { useWindowSize } from '@/hooks.tsx/useWindowSize';
import { usePokeBox } from '@/services.ts/pokemonService';
import RanchPokemon from '@/components/RanchPokemon.tsx';

export const Route = createFileRoute('/')({
  component: App,
})



function App() {
  const [width, height] = useWindowSize();
  const directionClass = height > width ? `h-[85vh] w-[85vw]` : `h-[80vh] w-[80vw]`;  const { status, data, error, isFetching } = usePokeBox()
  
  console.log(status, data, error, isFetching);
  return (
    <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)] text-center">
      <div className={`${directionClass} bg-[url(/grassy_field.jpg)] brightness-90 bg-cover relative`}>
        { status === 'pending' ? (
          'Loading...'
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : 
          <>
            {
              data.map((pokemon, index) => {
                return <RanchPokemon 
                  key={index}
                  numb={index}
                  pokemon={pokemon}
                  src={`/pokemon_hq/${pokemon.uri}.png`}
                  />
              })
            }
          </>
          }
      </div>
    </div>
  )
}
