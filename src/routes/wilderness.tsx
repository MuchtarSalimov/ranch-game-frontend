import { createFileRoute } from '@tanstack/react-router'
import { useWindowSize } from '@/hooks.tsx/useWindowSize';

export const Route = createFileRoute('/wilderness')({
  component: Wilderness,
})

function Wilderness() {
  const [width, height] = useWindowSize();
  const directionClass = height > width ? `h-[85vh] w-[85vw]` : `h-[80vh] w-[80vw]`;
  
  return (
    <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)] text-center">
      <div className={`${directionClass} bg-[url(/forest.jpg)] brightness-90 bg-cover`}>

      </div>
    </div>
  )

}