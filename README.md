## demo app with Docker

Set up: 
- frontend with JavaScript, HTML and CSS 
- backend with Node.js
- database with MongoDB

#### Integrate app with the database

1. DockerHUb: search for MongoDB(database) image 

    docker pull mongo:4.4

2. DockerHUb: search for Mongo Express(database UI) image

    docker pull mongo-express:0.54

3. Create network for mongo and mongo-express

    docker network create carol-mongo-network

3. Run mongo and mongo-express containers

OPTION 1

    docker run -d \
    -p 8001:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password \
    --name mongodb \
    --net carol-mongo-network \
    mongo:4.4

    docker run -d \
    -p 8002:8081 \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
    -e ME_CONFIG_MONGODB_SERVER=mongodb \
    --name mongoui \
    --net carol-mongo-network \
    mongo-express:0.54

OPTION 2

    docker-compose -f docker-compose.yaml up

4. Via UI (accessible under localhost:8002), create a new database "carol-demo-db"
    
5. Via UI (accessible under localhost:8002), create a new collection "my-pets" in "carol-demo-db"    
    
6. Start node server 

    node server.js

7. Access app under localhost:8000

#### Build a docker image of the app

    docker build -t docker-demo-app:1.0 .       

