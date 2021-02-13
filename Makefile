install/frontend/dev: 
	cd frontend; npm install;

start/frontend/dev: 
	cd frontend; npm run start;

start/backend/dev: 
	cd backend; mvn spring-boot:run;

## Build Docker Images ##
build/frontend:
	cd frontend; docker build . -t avlindfors/monty-hall-frontend;

build/backend:
	cd backend; docker build . -t avlindfors/monty-hall-backend;

## Build the entire system ##
build:
	make build/frontend; make build/backend;

## Start the entire system ##
start:
	docker-compose up
