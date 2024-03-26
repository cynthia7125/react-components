FROM node:18.18.0  

WORKDIR /

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
