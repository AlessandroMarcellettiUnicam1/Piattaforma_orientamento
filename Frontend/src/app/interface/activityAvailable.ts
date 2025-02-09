import { Professori } from "./professori";
import { ProfessoriUnicam } from "./professoriUnicam";
import { Studente } from "./studente";

export interface ActivityAvailable {
    nome: string;
    tipo: string;
    annoAcc: number;
    studPartecipanti: Studente[];
    dataInizio: Date;
    dataFine: Date;
    descrizione: string;
    profUnicam: ProfessoriUnicam;
    profReferente: Professori;
}