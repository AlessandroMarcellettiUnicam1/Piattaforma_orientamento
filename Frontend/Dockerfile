# Usare una base image di node per il build
FROM node:20 AS build

# Imposta la directory di lavoro
WORKDIR /app

# Copia il file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente
COPY . .

# Costruisci l'applicazione Angular
RUN npm run build --prod

# Usare una base image di nginx per servire l'applicazione
FROM nginx:alpine

# Copia i file buildati nella directory di nginx
COPY --from=build /app/dist/<PiattaformaPCTO> /usr/share/nginx/html

# Esporre la porta 80
EXPOSE 80

# Avviare nginx
CMD ["nginx", "-g", "daemon off;"]