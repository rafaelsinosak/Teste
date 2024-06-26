
# Dockerfile

# Use a imagem base do Node.js
FROM node:14-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos necessários para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install --production

# Copie o restante dos arquivos para o diretório de trabalho
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
