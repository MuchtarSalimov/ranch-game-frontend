import { createFileRoute } from '@tanstack/react-router'
import { usePokeBox } from '@/services.ts/pokemonService';
import PokemonCard from '@/components/PokemonCard';

export const Route = createFileRoute('/pokebox')({
  component: () => <PokeBox />,
})

function PokeBox() {
  const { status, data, error } = usePokeBox()

  // don't allow high grid counts for small data on big screen
  const gridClass = `min-h-full grid grid-cols-1
    ${ data && data.length > 1 ?'sm:grid-cols-2' : ''}
    ${ data && data.length > 2 ?'md:grid-cols-4' : ''}
    ${ data && data.length > 4 ?'xl:grid-cols-6' : ''}
    gap-16 justify-evenly`

  return (
    <div className="flex justify-evenly p-[4%]" >
        <div className={gridClass}>
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
