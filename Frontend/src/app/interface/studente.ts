import { Scuola } from "./scuola"

export interface Studente {
  _id: string
  nome: string
  cognome: string
  scuola: Scuola
}
