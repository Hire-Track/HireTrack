#H1 **API Dev Documentation**
----
  Information on how to start and use backend API

**Quick Start**
----
  * First Install All Dependencies:
  `npm install`

  * Then ensure you can access MongoDB database:
    - Go to cloud.mongodb.com
    - login
    - go to HireTrack folder and click on 'Network Access' on the side bar
    - add IP address by clicking on button on right had side if not there

  * Everything should be installed:
    - type `npm run server`
    - if that does not work ensure you have `"server": "nodemon server/server.js"` under "scripts" in your package.json file
    - api should be running on `localhost:5000/api` given the environment variable has not been modified

**Other Info**
----
* **URL**
  - Default URL for dev environment: `http://localhost:5000/api/`

* **API Routes and Models Documentation**
  - Run server then access `http://localhost:5000/api/docs`
  - All method documentation should be available here through Swagger Docs

* **Swagger Docs**
  - Run server then access `http://localhost:5000/api/docs`
  - You should be able to submit requests through Swagger but sometimes the execute fails (known bug), use postman instead to test if this is the case
  
* **Video Doc**

[![VIDEO WALKTHROUGH](https://img.youtube.com/vi/PgFF2U4A_-s/0.jpg)](https://www.youtube.com/watch?v=PgFF2U4A_-s)
