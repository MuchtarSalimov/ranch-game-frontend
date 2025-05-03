import { createFileRoute } from '@tanstack/react-router'
import { usePokeBox } from '@/services.ts/pokemonService';
import PokemonCard from '@/components/PokemonCard';

export const Route = createFileRoute('/pokebox')({
  component: PokeBox,
})


function PokeBox() {
  const { status, data, error } = usePokeBox()

  return (
    <div className="flex justify-evenly p-[4%]" >
        <div className={`min-h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-16 justify-evenly`}>
          { status === 'pending' ? (
            'Loading...'
            ) : status === 'error' ? (
              <span>Error: {error.message}</span>
            ) : 
            <>
              {data.map((pokemon, index) => (
                <PokemonCard key={index} pokemon={pokemon}/>
              ))}
            </>
            }
        </div>
    </div>
  )

}

//       <div className={`fixed z-[-1] bg-[#282c34] h-screen w-screen`}></div>
