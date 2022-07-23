## Project introduction

 **In this project, user registration with email confirmation, login, forget password and password change have been implemented.**

## Technologies used
 1. **backend :**  nestjs framework + typescript
 2. **documentation :**  swagger
 3. **database :**  mongodb
 4. **logging :**   EFK stack = ElasticSearch + Fluentd + Kibana
 5. **DevOps :**  docker + docker-compose


## follow below steps to ready your pc : 
1. **install the Node.js :** [Node.js](https://nodejs.org/en/)
2. **Download or clone this repo :**  `git clone https://github.com/pedramaghasian/jabama-challenge`


## steps to run the app :
1. **go to the package directory :** `cd ./user-management`
2. **install npm dependencies :** `npm install`
3. **run this command for prepare resources:** `npm run compose`
4. **execute the app :**  `npm run start:dev`

## steps to use the app
1. **open swagger :** `http://localhost:3000/api/v1/docs`

## steps to use kibana
1. **open kibana UI :** `http://localhost:5601/app/management/kibana/indexPatterns` 
2. **create this indexPattern :** `user-management`
3. **see you log :** `http://localhost:5601/app/discover`




