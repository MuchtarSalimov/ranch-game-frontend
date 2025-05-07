import { createFileRoute } from '@tanstack/react-router'
// import { points } from '../lib/points';
import { useContext } from 'react';
import { usePokeBox } from '@/services.ts/pokemonService';
import RanchPokemon from '@/components/RanchPokemon';
import { Login } from '@/components/Login';
import { AuthContext } from '@/hooks/UserProvider';

export const Route = createFileRoute('/')({
  component: () => <App/>
})

function App() {
  const { user } = useContext(AuthContext)

  // { status, data, error, isFetching } 
  const { status, data, error } = usePokeBox()

  if (!user.token) {
    return <Login/>
  }
  
  return (
    <div className="h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-[url(/grassy_field.jpg)] bg-cover">
      <div className={`h-full w-full relative`}>
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
