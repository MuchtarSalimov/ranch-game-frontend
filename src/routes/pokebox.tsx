import { createFileRoute } from '@tanstack/react-router'
// import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import { usePokeBox } from '@/services.ts/pokemonService';
import PokemonCard from '@/components/PokemonCard';

export const Route = createFileRoute('/pokebox')({
  component: PokeBox,
})


function PokeBox() {
  const theme = useTheme();
  // const [width, height] = useWindowSize();

  // const directionClass = height > width ? `h-auto w-[85vw]` : `h-auto w-[80vw]`;
  const directionClass = `w-[85vw]`;
  // const queryClient = useQueryClient()

  // { status, data, error, isFetching }
  const { status, data, error } = usePokeBox()
  return (
    <div className="min-h-[calc(screen-80px)] flex flex-col items-center py-[calc(2.5%+50px)] text-[calc(10px+2vmin)] text-center">
      <div className={`${directionClass} bg-[${theme.palette.primary.main}] grid grid-cols-[repeat(auto-fill,450px)] gap-16 justify-evenly`}>
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
