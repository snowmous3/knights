## Description
Knights Challenge

We have two paths, first backend and second the frontend.


## Installation
To the backend use: <br>
```bash
$ cd backend

$ cp .env.example .env

$ yarn install
```
<br>

To the frontend use: <br>


## Database
Before start backend and frontend you need create the instance of the mongodb:
```bash
$ docker-compose up -d
```
After finished the update, verify on console if was created:
```bash
$ docker ps
```
Maybe you'll have something like
```bash
xxxxxxx   mongo:latest   "docker-entrypoint.s…"   2 hours ago   Up 2 hours   0.0.0.0:27017->27017/tcp   knights-mongodb
```

## Running the app
Backend:<br>
```bash
$ cd backend

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
<br>

frontend:<br>

