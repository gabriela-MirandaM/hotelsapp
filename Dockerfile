# Usa una imagen base de Node.js
FROM node:20

# Crea el directorio de la aplicación
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que la aplicación usará
EXPOSE 8080

# Ejecuta la aplicación
CMD ["node", "index.js"]
