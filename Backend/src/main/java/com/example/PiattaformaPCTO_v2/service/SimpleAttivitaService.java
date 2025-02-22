package com.example.PiattaformaPCTO_v2.service;

import com.example.PiattaformaPCTO_v2.collection.*;
import com.example.PiattaformaPCTO_v2.dto.ActivityViewDTOPair;
import com.example.PiattaformaPCTO_v2.enumeration.Sede;
import com.example.PiattaformaPCTO_v2.repository.*;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class SimpleAttivitaService implements AttivitaService {

    @Autowired
    private AttivitaRepository attivitaRepository;
    /**
     * Universitario repository instance.
     */
    @Autowired
    private UniversitarioRepository universitarioRepository;
    @Autowired
    private ScuolaRepository scuolaRepository;
    @Autowired
    private StringFinderHelper stringFinderHelper;
    @Autowired
    private ScuolaService scuolaService;
    @Autowired
    private UniversitarioService universitarioService;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private RisultatiAttRepository risAttRepository;
    @Autowired
    private ImmatricolazioniRepository immatricolazioniRepository;
    @Autowired
    private StudenteRepository studenteRepository;
    @Autowired
    private RisultatiAttRepository risultatiAttRepository;
    @Autowired
    private RisultatiRepository risultatiRepository;

    private static String citySchool;

    @Override
    public String save(Attivita attivita) {
        return attivitaRepository.save(attivita).getNome();
    }










    /**
     * Find information about students that chose UNICAM and their high school, given an activity.
     *
     * @return list of activity view pairs
     */

    @Override
    public List<ActivityViewDTOPair> findStudentsFromActivity(String activityName) {
        List<ActivityViewDTOPair> result = new ArrayList<>();
        Attivita activity = this.attivitaRepository.findByNome(activityName);

        if(activity.getNome().equals("CONTEST_INFORMATICA_X_GIOCO_4043")){

            activity.getStudPartecipanti().forEach(s -> {
                List<Immatricolazioni> i = this.universitarioService.getIscrizioniAnno(4047);

                for (Universitario un : i.get(0).getUniversitari()){
                    if(un.getNome().equals(s.getNome().toUpperCase())){
                        if (un.getCognome().equals(s.getCognome().toUpperCase())){
                            result.add(new ActivityViewDTOPair(un,this.findScuola(un.getComuneScuola(),un.getScuolaProv())));
                        }
                    }
                }

            });
        }else {
            activity.getStudPartecipanti().forEach(s -> {
                List<Immatricolazioni> i = this.universitarioService.getIscrizioniAnno(4047);
                for (Universitario un : i.get(0).getUniversitari()){
                    if(un.getNome().equals(s.getNome().toUpperCase())){
                        if (un.getCognome().equals(s.getCognome().toUpperCase())){
                            if (un.getComuneScuola().equals(s.getScuola().getCitta().toUpperCase())){
                                result.add(new ActivityViewDTOPair(un, this.scuolaRepository.getScuolaByNomeContainingAndAndCitta(
                                        s.getScuola().getNome(), un.getComuneScuola())));
                            }
                        }
                    }
                }

            });
        }
        return result;
    }

    @Override
    public List<Attivita> getAttivita(int anno) {
        int min= anno-6;
        Query query = new Query();
        query.addCriteria(Criteria.where("annoAcc").gte(min).lt(anno));
        return mongoTemplate.find(query,Attivita.class);
    }


    /**
     * Metodo che carica una singola attività: prende i dati dal file excel e li carica nel database.
     *
     * @param nome
     * @param tipo
     * @param scuola
     * @param cittàScuola
     * @param anno
     * @param sede
     * @param dataInizio
     * @param dataFine
     * @param descrizione
     * @param prof
     * @param profReferente
     * @param file
     */
    @Override
    public void uploadSingleActivity(String nome, String tipo, String scuola, String cittàScuola, int anno, Sede sede, LocalDateTime dataInizio, LocalDateTime dataFine, String descrizione, ProfessoreUnicam prof, Professore profReferente, MultipartFile file) {

        Sheet dataSheet = this.fileOpenerHelper(file);
        Iterator<Row> iterator = dataSheet.rowIterator();
        iterator.next();
        Scuola scuolaP;

        List<Studente> studPartecipanti=new ArrayList<>();

        while(iterator.hasNext()){
            Row row = iterator.next();
            boolean isRowCorrect = row.getCell(0) != null && row.getCell(1) != null && row.getCell(2) != null && row.getCell(3) != null;
            if (!isRowCorrect) {
                break; // Interrompe se la riga è vuota o con valori errati
            }
            String nomeStud = row.getCell(0).getStringCellValue();
            String cognome = row.getCell(1).getStringCellValue();
            String email;
            if (scuola.isEmpty() && cittàScuola.isEmpty()){
                scuolaP = new Scuola(row.getCell(2).getStringCellValue(), row.getCell(3).getStringCellValue());
            }else {
                scuolaP = scuolaRepository.getScuolaByCittaAndNome(cittàScuola, scuola);
            }
            if (row.getCell(4) != null) {
                email = row.getCell(4).getStringCellValue();
            }else email = "";

            Studente stud = new Studente(nomeStud, cognome,email,scuolaP);
            System.out.println("Studente creato: "+stud);
            if (studenteRepository.findByNomeAndCognomeAndEmail(nomeStud,cognome, email) == null) { // Verifica se lo studente è già presente nel database
                try {
                    studenteRepository.save(stud);
                } catch (Exception e) {
                    System.err.println("Errore durante il salvataggio dello studente: " + e.getMessage());
                }
            }

            studPartecipanti.add(stud);
        }

        if (attivitaRepository.findByNomeAndAnno(nome, anno) == null) {
            Attivita attivita = new Attivita(nome, tipo, anno, studPartecipanti, sede, dataInizio, dataFine, descrizione, prof, profReferente, false);
            citySchool = cittàScuola;
            if (scuola != null && !scuola.isEmpty()) {
                attivita.setScuola(scuola);
            }

            attivitaRepository.save(attivita);
            createRisulataiAtt(attivita);

            if (scuola != null && !scuola.isEmpty()) {
                createRisultati(attivita);
            }
        }

    }


    /**
     * Metodo che da un attività crea la vista sulle scuole e sugli studenti che hanno partecipato; compresi quelli iscritti all'università.
     * @param attivita
     */
    private void createRisultati(Attivita attivita){
        Presenza presenza = createPresenza(attivita);
        List<Risultati> risultati = risultatiRepository.findAll();
        // Se l'attività ha una scuola associata (non vuota)
        if (!attivita.getScuola().equals("")) {
            Scuola scuola = scuolaRepository.getScuolaByCittaAndNome(citySchool, attivita.getScuola());
            if (scuola == null) {
                System.out.println("Scuola non trovata per la città " + citySchool + " e nome " + attivita.getScuola());
                return;
            }
            // Cerca se esiste già un record Risultati per questa scuola e anno accademico
            Risultati risultatoEsistente = null;
            for (Risultati r : risultati) {
                if (r.getScuola() != null && r.getScuola().getIdScuola() != null &&
                        r.getScuola().getIdScuola().equals(scuola.getIdScuola()) &&
                        r.getAnnoAcc() == attivita.getAnnoAcc()) {
                    risultatoEsistente = r;
                    break;
                }
            }
            // Se non esiste un record, creane uno nuovo
            if (risultatoEsistente == null) {
                Risultati nuovoRisultato = new Risultati(attivita.getAnnoAcc(), scuola);
                nuovoRisultato.addAttivita(presenza);
                nuovoRisultato.addIscritti(presenza.getIscritti());
                risultatiRepository.save(nuovoRisultato);
            } else {
                // Se esiste già un record, aggiorna la lista degli iscritti e delle attività evitando duplicati
                List<Universitario> iscrittiEsistenti = risultatoEsistente.getIscritti();
                Set<Universitario> universitarioSet = new LinkedHashSet<>();
                if (iscrittiEsistenti != null) {
                    universitarioSet.addAll(iscrittiEsistenti);
                }
                // Aggiungi i nuovi iscritti dalla presenza
                List<Universitario> nuoviIscritti = presenza.getIscritti();
                if (nuoviIscritti != null) {
                    universitarioSet.addAll(nuoviIscritti);
                }
                risultatoEsistente.setIscritti(new ArrayList<>(universitarioSet));
                List<Presenza> attivitaEsistenti = risultatoEsistente.getAttivita();
                Set<Presenza> attivitaSet = new LinkedHashSet<>();
                if (attivitaEsistenti != null) {
                    attivitaSet.addAll(attivitaEsistenti);
                }
                attivitaSet.add(presenza);
                risultatoEsistente.setAttivita(new ArrayList<>(attivitaSet));
                risultatiRepository.save(risultatoEsistente);
            }
        }
    }

    /**
     * Metodo che crea la presenza
     * @param attivita
     */
    private Presenza createPresenza(Attivita attivita) {
        return getPresenza(attivita, risultatiAttRepository);


    }

    @NotNull
    public Presenza getPresenza(Attivita attivita, RisultatiAttRepository risultatiAttRepository) {
        Set<Universitario> universitariSet = extractUniversitariFromAttivita(attivita);
        universitariSet.addAll(risultatiAttRepository.findbyNomeAttivita(attivita.getNome()).get(0).getUniversitarii());
        Presenza presenza=new Presenza(attivita.getNome());
        presenza.setTipo(attivita.getTipo());
        presenza.addPartecipanti(attivita.getStudPartecipanti());
        presenza.addIscritti(new ArrayList<>(universitariSet));
        return presenza;
    }


    /**
     * Metodo che crea la vista dei risultati di quella attività va a vedere gli studenti che sono diventati universitari
     * @param attivita
     */
    private void  createRisulataiAtt(Attivita attivita){
        RisultatiAtt risultatiAtt=new RisultatiAtt();
        risultatiAtt.setAnnoAcc(attivita.getAnnoAcc());
        risultatiAtt.setAttivita(attivita.getNome());
        risultatiAtt.setTipo(attivita.getTipo());
        Set<Universitario> universitariSet= extractUniversitariFromAttivita(attivita);
        risultatiAtt.setUniversitarii(new ArrayList<>(universitariSet));
        risultatiAttRepository.save(risultatiAtt);
    }

    /**
     * Metodo che aggiorna i risultatiAtt in modo da aggiungere gli studenti che sono diventati universitari dopo la creazione dell'attività.
     */
    public void updateRisultatiAtt(){
        List<RisultatiAtt> risultatiAttList= risultatiAttRepository.findAll();
        for (RisultatiAtt risultatoAttività : risultatiAttList) {
            Attivita attivita = attivitaRepository.findByNomeAndAnno(risultatoAttività.getAttivita(), risultatoAttività.getAnnoAcc());
            if (attivita == null) continue;
            // Estrae i nuovi universitari dalla attività
            Set<Universitario> universitariSetUpdated = extractUniversitariFromAttivita(attivita);
            // Unisce con quelli già presenti
            universitariSetUpdated.addAll(risultatoAttività.getUniversitarii());
            risultatoAttività.setUniversitarii(new ArrayList<>(universitariSetUpdated));
            risultatiAttRepository.save(risultatoAttività);
        }
    }

    /**
     * Metodo che estrae e normalizza i dati dei partecipanti all’attività per ottenere un Set di Universitari senza duplicati.
     *
     * @param attivita
     * @return universitariSet
     */
    private Set<Universitario> extractUniversitariFromAttivita(Attivita attivita) {
        Set<Universitario> universitariSet = new LinkedHashSet<>();
        for (Studente stud : attivita.getStudPartecipanti()) {
            // Normalizza: rimuove spazi multipli, elimina spazi iniziali/finali e converte in maiuscolo
            Universitario universitario = universitarioRepository.findByNomeAndCognome(stud.getNome().toUpperCase().trim(), stud.getCognome().toUpperCase().trim());
            if (universitario != null) {
                universitariSet.add(universitario);
            }
        }
        return universitariSet;
    }












    private Scuola findScuola(String citta, String scuola){
        citta = citta.toUpperCase();
        scuola = scuola.toUpperCase();
        List<Scuola> scuole = scuolaRepository.getScuolaByCitta(citta);
        List<String> nomi = new ArrayList<>();
        for (Scuola s : scuole){
            nomi.add(s.getNome());
        }
        return  scuolaRepository.getScuolaByNome(findMostSimilarString(scuola,nomi));
    }

    @Override
    public Sheet fileOpenerHelper(MultipartFile file) {
        try {
            Path tempDir = Files.createTempDirectory("");
            File tempFile = tempDir.resolve(file.getOriginalFilename()).toFile();
            file.transferTo(tempFile);
            Workbook workbook = new XSSFWorkbook(tempFile);
            Sheet dataSheet = workbook.getSheetAt(0);
            return dataSheet;
        } catch (IOException | InvalidFormatException e) {
            throw new RuntimeException(e);
        }
    }



    private  String findMostSimilarString(String input, @org.jetbrains.annotations.NotNull List<String> strings) {
        String mostSimilarString = "";
        int minDistance = Integer.MAX_VALUE;
        for (String str : strings) {
            int distance = levenshteinDistance(input, str);
            if (distance < minDistance) {
                minDistance = distance;
                mostSimilarString = str;
            }
        }
        return mostSimilarString;
    }


    private  int levenshteinDistance(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();
        int[][] dp = new int[m+1][n+1];
        for (int i = 0; i <= m; i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j;
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i-1) == s2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1]));
                }
            }
        }
        return dp[m][n];
    }





}
