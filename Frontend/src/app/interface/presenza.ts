import { Stedente } from "./stedente"

export interface Presenza {
  nomeAttivita: string
  tipo:string
  partecipanti: Stedente[]
  iscritti: Stedente[]
}
