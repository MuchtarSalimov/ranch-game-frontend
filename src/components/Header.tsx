import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <nav  className="flex flex-row gap-4 px-4 h-[80px] font-bold text-4xl bg-sky-900 text-white items-center">
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
    </nav>
  )
}
