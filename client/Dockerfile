# Usa un'immagine base di Node.js
FROM node:20.12.2-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente
COPY . .

# Costruisci l'app Angular per la produzione
RUN npm run build-prod

# Installa un server statico semplice
RUN npm install -g http-server

# Esponi la porta 4200
EXPOSE 4200

# Avvia il server HTTP per servire i file Angular
CMD ["http-server", "dist/browser", "-p", "4200", "-a", "0.0.0.0", "-P", "index.html"]
