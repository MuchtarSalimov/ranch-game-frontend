import { createFileRoute } from '@tanstack/react-router'
// import { points } from '../lib/points';
import { useContext } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { usePokeBox } from '@/services.ts/pokemonService';
import RanchPokemon from '@/components/RanchPokemon';
import { Login } from '@/components/Login';
import { AuthContext } from '@/hooks/UserProvider';

export const Route = createFileRoute('/')({
  component: () => <App/>
})

function App() {
  const { user } = useContext(AuthContext)
  const [width, height] = useWindowSize();

  const directionClass = height > width ? `h-[85vh] w-[85vw]` : `h-[80vh] w-[80vw]`;
  // { status, data, error, isFetching } 
  const { status, data, error } = usePokeBox()

  if (!user.token) {
    return <Login/>
  }
  
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
              data.length > 0 && data.map((pokemon, index) => {
                return <RanchPokemon 
                  key={index}
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
