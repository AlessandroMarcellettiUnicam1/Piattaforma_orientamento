import { Id } from "./id"
import { Presenza } from "./presenza"
import { Scuola } from "./scuola"
import { Stedente } from "./stedente"
import { Universi } from "./universi"

export interface Res {
  _id: Id
  annoAcc: number
  scuola: Scuola
  attivita: Presenza[]
  iscritti: Universi[]
  _class: string
}
