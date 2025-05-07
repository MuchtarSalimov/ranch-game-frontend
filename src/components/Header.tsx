import { Link } from '@tanstack/react-router'
import { useContext } from 'react';
import { Button } from '@mui/material';
import { AuthContext } from '@/hooks/UserProvider';

export default function Header() {
  const { user } = useContext(AuthContext);
  const { setRemember, setUser } = useContext(AuthContext);

  function logout() {
    window.localStorage.removeItem('user');
    setRemember(false)
    setUser({
      username: null,
      userid: null,
      token: null
    })
  }

  const logoutButton = <Button sx={{height: '40px', width: '100px', top: '20px', right: '20px'}} onClick={() => logout()} className={"bg-gray-400 text-black"} variant="contained" color="info">Log Out</Button>;

  return (
    <nav  className="h-[80px] bg-sky-800 flex flex-row justify-between text-white">
      <div className={"flex flex-row gap-4 px-4 font-bold text-lg sm:text-2xl md:text-4xl items-center"}>
      <Link
        to="/"
        className={`hover:text-green-300`}
        activeProps={{ className: `text-green-300` }}
      >Ranch</Link>

      <Link 
        to="/wilderness"
        className={`hover:text-green-300`}
        activeProps={{ className: `text-green-300` }}
      >Wilderness</Link>
      <Link 
        to="/pokebox"
        className={`hover:text-green-300`}
        activeProps={{ className: `text-green-300` }}
      >PokeBox</Link> 
      </div>
      { (!!user.token) && logoutButton }
    </nav>
  )
}

// user.token &&