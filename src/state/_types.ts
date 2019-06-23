export type Particle = {
  x: number
  y: number
} & ({ color: string } | { textureSrc: string })
