# Containerizing this Project

This project was started while learning to write react code. At this point I am using it to prctice DevOps skills recently learnt.

# Seting up and starting

To begin install dependancies by running:

```
npm i
```

Next run the project using:

```
npm run dev
```

# Dockerization

1. Install docker and make sure it runs ( [here are the steps](https://docs.docker.com/engine/install/))


2. Created the docker file for a start:

   ```
   FROM node:18.18.0

   WORKDIR /

   COPY package*.json ./

   RUN npm install

   COPY . .

   EXPOSE 3000

   CMD [ "npm", "run", "dev" ]
   ```

3. Run this command to build it:

   ```
   docker build -t reyhanacynthia/codecamp:v1.0.0 .
   ```

4. To run the image use:

    ```
    docker run -p  3000:3000 reyhanacynthia/codecamp:v1.0.0
    ```

At this point you can access the site on docker on [https:localhost:3000](http://localhost:3000/). After confirming iit runs sign into Docker using:
```
docker login
```
You will be prompted to enter your docker hub credentials. Then you can push your image to docker hub, [here](https://hub.docker.com/repository/docker/reyhanacynthia/codecamp/general) is the link to the image used for this project.

# Setup cypress
Use [this](https://docs.cypress.io/guides/getting-started/installing-cypress) cypress guide to set up cypress.


# Jenkins
1. Download jenkins image using: 
   ```
   docker image pull jenkins/jenkins:lts
   ```
2. Run jenkins:

   ```
   docker run -p 8080:8080 -p 50000:50000 -d -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
   ```
