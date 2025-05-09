import { Pokeball } from "./Pokeball";
import type {PropsWithChildren} from "react";

interface AvailableBallsProps extends PropsWithChildren {
  ballCount: number | undefined;
}

// display icons in the corner for each available pokeball
export function AvailableBalls({ ballCount }: AvailableBallsProps) {
  return (
    <div className={`absolute top-0 right-0 p-4 flex gap-4 items-start`}>
      { ballCount && [...Array(ballCount)].map((_item, index)=> <Pokeball key={index}/>)}
    </div>
  )
}