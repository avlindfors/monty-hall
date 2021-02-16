# Monty Hall Simulator
A fullstack app built with React, TailwindCSS, and Spring Boot. 

## Start production build with docker
To start the docker environment all you need is `docker`.

If you can run Makefiles:
```bash
$ make build
$ make start
```
>The `build` command will create the docker images.
>The `start` command will start the frontend and backend apps.

Or manually build the docker images with:
```bash
$ cd frontend
$ docker build . -t avlindfors/monty-hall-frontend
```
and
```bash
$ cd backend
$ docker build . -t avlindfors/monty-hall-backend
```
Start the frontend and backend with (from project root):
```bash
$ docker-compose up
```

>The dockerized frontend is available at `http://localhost:8000` by default.
 ## Start local dev build
 To start the local dev build you need `npm` and `mvn`.
 ### Frontend
 ```bash
$ cd frontend
$ npm install
$ npm start
 ```
 >The dev frontend is available at `http://localhost:3000` by default.

### Backend
Start the backend app from your IDE or from the command line:
 ```bash
$ cd backend
$ mvn clean install
$ mvn spring-boot:run
 ```

 ## Usage
 Open the frontend app in your browser.
 
 Configure a simulation by picking the number of simulations to run and decide if you stick or swap. If you enter a custom number of simuilations the number can range from [1, 1000000000]. Click simulate!
 
 There is limited validation in the frontend to show some error-responses from the backend.