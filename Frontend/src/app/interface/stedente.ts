import { Scuola } from "./scuola"

export interface Stedente {
  _id: string
  nome: string
  cognome: string
  scuola: Scuola
}
