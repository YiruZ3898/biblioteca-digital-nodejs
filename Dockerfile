# 1. Usamos Node 24 en su versión "slim" (Debian ligero)
FROM node:24-slim

# 2. Instalamos herramientas necesarias para compilar bcrypt si es necesario
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# 3. Creamos y nos movemos a la carpeta de trabajo
WORKDIR /app

# 4. Copiamos solo los archivos de dependencias
COPY package*.json ./

# 5. Instalamos solo las dependencias de producción (ignora nodemon)
RUN npm install --omit=dev

# 6. Copiamos el resto del código
COPY . .

# 7. Exponemos el puerto (informativo)
EXPOSE 3000

# 8. Comando de inicio
CMD ["npm", "start"]