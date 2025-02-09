import { Studente } from "./studente"

export interface Presenza {
  nomeAttivita: string
  tipo:string
  partecipanti: Studente[]
  iscritti: Studente[]
}
