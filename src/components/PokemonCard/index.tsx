import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { Pokemon } from '../../types/pokemon';
import './style.css';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="magic-card max-w-[250px] max-h-[340px] text-center">
      <Card sx={{
          boxShadow: 'none',
          bgcolor: '#191c29',
        }}>
        <CardMedia
          component="img"
          sx={{ height: '250', width: '250' }}
          image={`/pokemon_hq/${pokemon.uri}.png`}
        />
        <div className={'mt-4'}>
          <Typography component="div" color='#bbb'>
            {pokemon.nickname ? pokemon.nickname : null}
          </Typography>
          <Typography component="div" color='#bbb'>
          {pokemon.species}
          </Typography>
          <Typography component="div" color='#bbb'>
          level {pokemon.level}
          </Typography>
        </div>

       {/* <CardActions>
           <Button className='w-[20%] text-lg'target="_blank" href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.species}_(Pok%C3%A9mon)`}>More</Button> 
        </CardActions>*/}
      </Card>
    </div>

  );
}