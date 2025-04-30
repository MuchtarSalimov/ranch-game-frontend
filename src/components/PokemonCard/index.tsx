import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Pokemon } from '../../types/pokemon';
import './style.css';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="magic-card">
      <Card sx={{
          bgcolor: '#191c29',
          width: 400,
        }}>
        <CardMedia
          sx={{ height: 400 }}
          image={`/pokemon_hq/${pokemon.uri}.png`}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div" color='#bbb'>
            {pokemon.nickname ? pokemon.nickname : pokemon.species}
          </Typography>
          <Typography variant="h5" sx={{ color: '#bbb' }} >
            <ul>
              <li>{pokemon.species}</li>
              <li>level: {pokemon.level}</li>
            </ul>
          </Typography>
        </CardContent>
        <CardActions>
          <Button target="_blank" href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.species}_(Pok%C3%A9mon)`} size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>

  );
}