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

1. Install docker and make sure it runs ( [here are the steps](https://docs.docker.com/engine/install/)


2. Created the docker file for a start:

   ```
   FROM node:18.18.0

   WORKDIR /

   COPY package*.json ./

   RUN npm install --legacy-peer-deps

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

# Incorportate mongodb

- At this point I noticed that I was using data that is in json formatin a json file.

## Seting up mongodb

1. Log in and create a new mongodb database on the mongodb [server](https://account.mongodb.com/account/login)
2. create a file that you will use to migrate your data to mongodb from json. For this I created [importData.js](importData.js) and used the below command to run the file and perform the import.
```
node importData.js
```
3. Verify that your data is correctly imported to the database.

# Jenkins

1. Download jenkins image using:
   ```
   docker pull jenkins/jenkins
   ```
2. Run jenkins:

   ```
   docker run -p 8080:8080 -p 50000:50000 -d -v jenkins_home:/var/jenkins_home jenkins/jenkins
   ```

   At this point you can access jenkins console on http://localhost:8080 . Set it up by grabbing the password from the file path indicated and set up your user.

3. After clicking the above url you will be prompted a password. Since you are using a jenkins container in docker the password will not be found locally in your computer.Follow this steps to get your jenkins password.

   - Access jenkins bash using

   ```
   docker exec -it <container_ID> bash

   ```

   Note: Get container ID from running ` docker ps -a`

   - Within the bash cd to the secrets file and read the contents of the initialAdminPassword file using the below commands

   ```
   cd /var/jenkins_home/secrets

   cat initialAdminPassword
   ```

   Head back to the jenkins and input the jenkins password that will look something like this `3f627075651d4de389fff8ff9e741729`.
   After loging in to jenkins you will choose either to install suggested software or customize software to be installed.


