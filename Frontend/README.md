# M.A.A.I.Web : una piattaforma per il Monitoraggio e Analisi delle Attività di Orientamento Informatica

M.A.A.I Web è una piattaforma che permette di monitorare e facilitare la visualizzazione dell'impatto che anno le attività di orientamento proposte dalla sezione di informatica dell'università di Camerino.

### Funzionamento

Questa piattaforma permette di eseguire due operazioni fondamentali per la gestione di questi dati:

- _Upload_ : caricare i foglio di lavoro Execl dove sono salvati i nomi degli studenti che hanno partecipato ad una attività la lista di quellli che si sono iscritti all'università

- _Visualizzazione_ : visualizzare i dati raccolti secodno due viste , vista scuole e vista attività, e attraverso una mappa in cui sono evidenziate le regioni italiane da cui provengono gli iscritti
- _Iscrizione-: sezione in cui è possibile caricare attività vuote(a cui è possibile iscriversi), iscriversi alle attività , impossibilitare l'iscrizione alle attività.

Ora analizzeremo questi funzionamenti nel dettaglio.

### Upload

La funzione upload ,come detto prima, permette di caricare nella piattaforma dei fogli excel per ottenere i dati che ci interessano.L'upload dei file è forzato ad essere in formato xlsx.<br>
Gli upload si dividono in attività e iscritti, nel caso delle attività la piattaforma chiederà di inserire il nome di quella specifica attivià mentre nel secondo caso vi sarà un semplice upload.Al di sotto dello spazio per adebito al caricameto vi è uno screenshot che mostra come deve essere formattato il file per entrmabi i casi.<br>
Una volta caricato il file la piattaforma manderà il suddetto al server che aprirà i file e salverà il loro contenuto all'interno del database <br>
Quando si caricano i file delle immatricolazioni il server provvederà a confrontare gli iscritti con i partecipanti alle attivià dei 3 anni accademici precedenti per poter ottenere i dati da visualizzare nelle apposite sezioni.

### Visualizzazzione

Per la visualizzazione ci sono due sezioni, la prima permette di visualizzare le statistiche in base a quattro viste, vista scuole e vista attività, vista professori Scuole e vista professori Unicam, la seconda invece attraverso una mappa delle regioni italiane.<br>

####

Per la vista scuole la piattaforma permette la visualizzazione di una lista con tutte le scuole che hanno partecipato alle attività dei 3 anni accademici precedenti e, a primo sguardo, permette di visualizzare il numero di iscritti ottenuti da quella scuola.
Di base vengono mostrati i risultati relativi all'anno accedemico corrente in ordine descrente in base al nuemro di iscritti ma attraverso l'apposito selettore si può cambiare l'anno accademico, in base a quelli presenti nel database, e l'ordine di visualizzazione di questi dati ovvero:

- _Iscritti_: ordinamente decrescente in base agli iscritti, visualizzazione base
- _Alfabetico per scuole_ : ordinameto alfabetico sulla base del nome delle scuole
- _Alfabetico per regione_ : ordinameto alfabetico sulla base alla regione della scuola.

Cliccando su una di queste scuole si aprira il dettaglio di esse in cui vengono mostrate le attività a cui ha partecipato, con quanti partecipanti e quanti iscritti ha generato, al di sotto vi è la lista dei nomi degli studenti che si sono iscritti da quella scuola e che hanno partecipato ad una attività

###

La vista attivtà funziona analogamente alla vista scuole solo che i dati sono divisi in funzione delle attività.<br>
Di base viene visualizzata una lista con tutti le attività che hanno portato iscritti nell'anno accademico corrente. Queste attività sono, come per l'altra vista, ordinate in maniera decrescente in base al numero di iscritti.<br>
Anche qui è possibile selezionare l'anno accademico di cui vedere i risultati e l'ordinamento che però stavolta sarà solo numerico in base agli iscritti o alfabetico in base al nome dell'attività.
Anche qui cliccando su un attività uscira il dettaglio con la lista degli studenti che si sono iscritti
###

Vista professori Scuole permette di visualizzare tutti i professori degli istituti superiori che sono stati referenti delle attività


###

Vista professori Unicam permette di visualizzare tutti i professori Unicam   che sono stati referenti delle attività

### Mappa


La mappa è una terza vista in cui vengono visualizzati i dati delle iscrizioni divisi per regione di provenienza. Le regioni sono colorate in modo diverso per indicare il numero di iscritti provenienti da quella regione:

- _Rosso_ : 0 iscritti;
- _Blue_ : iscritti >= 1 e iscritti <=9
- _Viola_ : iscritti >= 10 e iscritti <=99
- _Verde_ : iscritti > 100
Cliccando su una di esse si aprira il dettaglio che mostra il numero di iscritti ma diviso per le scuole di quella data regione.




###

Inoltre, nella sezione statistche, vi è un tab dedicato alla lista di tutti i professori che fanno da referenti per le attività di PCTO, nella sezine sarà possibile vedere il nome, cognome, mail istituzionale e la scuola di riferimento.

### Tecnologie utilizzate

Le tecnologie utilizzate per questa piattaforma sono :

- [Angular](https://angular.io) : framework per lo sviluppo front-end
- [Spring](https://spring.io) : framework java per lo sviluppo backend
- [ApachePOI](https://poi.apache.org): libreia java che permette di lavorare su file della suite office, in particolare i file xlsx
- [MongoDB](https://www.mongodb.com/it-it): DBMS non relazionale

### Angular

Angular è stato utilizzato sia per la realizzazione della pagina HTML, sia come client Http per ricevere, attraverso delle RestAPI, e manipolare i dati , attraverso la logica di TypeScript, che servivano per popolare le viste richieste

### SpringBoot e ApachePOI

Per gestire le RestAPI è stato utilizzato Springbot come backend nello specifco le chiamte GET e POST.
Oltre alla gestione delle chiamate è stato utilizzato per la lettura dei file Excel con l'aiuto dei metodi di lettura messi a disposizine dalla libreria ApachePOI.
Grazie alla logica di Java è stato possibile confrontare i dati ottenuti e produrre dei risultati.
In fine è stato utilizzato anche per la gestione delle chiamate CRUD al DBMS.

### MongoDB

MongoDB è il DBMS utilizzato per mantere la persistenza dei dati
