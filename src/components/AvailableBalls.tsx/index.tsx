import { usePokeBallCount } from "@/services.ts/pokemonService";
// import type {PropsWithChildren} from "react";

// interface AvailableBallsProps extends PropsWithChildren {
// }


export function AvailableBalls() {
  // { status, data, error, isFetching } 
  const { data } = usePokeBallCount()

  return (
    <div className={`absolute top-[10%] right-[12%] flex  gap-4 items-start`}>
      {data && [...Array(data)].map((_item, index)=> {
          return <img key={index} title="pokeballs regenerate over time -  max 3" className={`h-[50px] sm:h-[75px] xl:h-[120px]`} src={`/pokeball.png`}></img>
      })}
    </div>
  )
}