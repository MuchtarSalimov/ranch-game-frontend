export const nudge = (starting_x: number, starting_y: number, move_scaling: number) =>{
  let [a, b] = [
    starting_x + move_scaling*Math.random() - 0.5*move_scaling,
    starting_y + move_scaling*Math.random() - 0.5*move_scaling
  ]
  if (a < 0){ a = 0 }
  if (a > 1) { a= 1}
  if (b < 0){ b = 0 }
  if (b > 1) { b= 1}
  return [a, b]
}