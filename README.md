# Piattaforma di Orientamento Unicam

## Descrizione
La piattaforma è pensata per i docenti Unicam e l'università, offrendo statistiche sull’impatto delle attività di orientamento (e non solo) svolte negli istituti superiori. Essa consente di:
- Valutare quali attività funzionano meglio.
- Analizzare la geolocalizzazione degli studenti iscritti per verificare l’efficacia delle attività in diverse zone.
- Organizzare e gestire tutte le informazioni sulle attività organizzate dall'università.

## Tecnologie Utilizzate
- **Backend**: Java Spring Boot (porta 8080)
- **Frontend**: Angular (porta 4200)
- **Containerizzazione**: Docker e Docker Compose

## Modalità di Avvio

### Avvio con Docker
1. **Prerequisiti**: Assicurati di avere installato [Docker](https://www.docker.com/get-started) e Docker Compose.
2. **Clona il repository** e posizionati nella cartella principale.
3. **Avvia l'applicazione** eseguendo il comando:
   ```sh
   docker compose up --build
   ```
   - **Frontend**: accessibile su `http://localhost:4200`
   - **Backend**: accessibile su `http://localhost:8080`

### Avvio Manuale
#### Avvio del Backend
1. Vai nella cartella `Backend`:
   ```sh
   cd Backend
   ```
2. Costruisci ed avvia l'applicazione:
   ```sh
   mvn clean package
   mvn spring-boot:run
   ```
   - Il backend sarà disponibile su `http://localhost:8080`

#### Avvio del Frontend
1. Vai nella cartella `Frontend`:
   ```sh
   cd Frontend
   ```
2. Installa le dipendenze e avvia il server:
   ```sh
   npm install
   ng serve 
   ```
   - Il frontend sarà accessibile su `http://localhost:4200`



