# feedback-api

A REST/web socket API for the pluggable user-rating app where the back end Url can be changed easily by changing the ```backendUrl``` query parameter. When this API app is deployed, its url can be input as a back end for any of the front end apps built basing on the [vuetify-feedback-front repo](https://github.com/Tinitto/vuetify-feedback-front).

## Dependecies

This is a Feathersjs application connected to a mongoDB through a Mongoose ORM interface.

1. [Feathersjs v+3.2.3](https://feathersjs.com/)
2. [MongoDB](https://www.mongodb.com/)
3. [Mongoose v+5.3.4](https://mongoosejs.com/)
4. [Nodejs ~8.0.0](https://nodejs.org/)

It handles authentication using the Google Basic Oauth strategy provided by ```"@feathersjs/authentication-oauth2```

## Demo

The demo has two pieces working together; the back and the front:

1. The back end: [https://vuetify-feedback-api.herokuapp.com](https://vuetify-feedback-api.herokuapp.com/docs)
2. The Front end: [https://feedback.sopherapps.com?backendUrl=https://vuetify-feedback-api.herokuapp.com](https://feedback.sopherapps.com?backendUrl=https://vuetify-feedback-api.herokuapp.com)

## Running on Development Machine

Be sure to have Nodejs and MongoDB installed (or you could use a free MongoDB instance offered by [MLab on Heroku](https://elements.heroku.com/addons/mongolab)).
__(The commands shown are for Linux. Be sure to get the equivalent ones for your Operating System)__

1. Ensure that the MongoDB is running (or if is hosted on another server, check that you are connected to the internet).

    ```bash
    sudo systemctl enable mongod.service
    ```
    This enables it to start on system startup

    ```bash
    sudo systemctl start mongod
    ```
    This starts the MongoDB engine

2. Clone the back end repo

    ```bash
    git clone https://github.com/Tinitto/feedback-api.git
    ```

3. Install the dependencies

    ```bash
    cd feedback-api && npm install
    ```

4. Change ```example.env``` to ```.env```
5. Create a Google Auth Client to get your ```CLIENT_ID``` and ```CLIENT_SECRET```. Follow this [guide](https://developers.google.com/+/web/signin/)
6. Update your ```.env``` file with the ```GOOGLE_CLIENT_ID``` and ```GOOGLE_CLIENT_SECRET``` obtained.
7. Run the development server

    ```bash
    npm run dev
    ```

8. Visit [http://localhost:3030/auth/google](http://localhost:3030/auth/google) in your browser.
9. You might be asked to login with Google
10. You will be redirected to the url ```http://localhost:8080?token=<your token>```. Copy the token
11. If you have the [Postman application](https://www.getpostman.com/), create an application by sending a POST to the ```http://localhost:3030/applications``` address with the __Authorization__ header ```JWT <your token>``` and JSON data

    ```JSON
    {
      "name": "Any name of your choice",
      "description": "Just a random description"
    }
    ```

12. For other possible operations on the server, visit the docs at [http://localhost:3030/docs](http://localhost:3030/docs)

13. You can then test your backend on a live front end app by visiting the url [https://feedback.sopherapps.com?backendUrl=http://localhost:3030](https://feedback.sopherapps.com?backendUrl=http://localhost:3030). you could also set up your own client app locally. Find the instructions for that on the [client repo README](https://github.com/Tinitto/vuetify-feedback-front#on-development-machine)

## Deployment

You can deploy to any hosting provider that runs Nodejs and MongoDB.
Here are the instructions for deploying to [Heroku](https://heroku.com)

1. Create an [account with Heroku](https://signup.heroku.com/) if you haven't already.
2. Download the Heroku Cli

    ```bash
    sudo snap install --classic heroku
    ```

3. In your Heroku cli, login

    ```bash
    heroku login
    ```

4. On your development machine, enter the directory where the code for this repo is and create a heroku app using the Heroku cli.

    ```bash
    cd feedback-api
    ```

    ```Bash
    heroku create <some name of your choice>
    ```

5. Provision a Heroku MongoDB instance to that app

    ```Bash
    heroku addons:create mongolab:sandbox
    ```

6. Set up the environment variables. Check the [example.env](./example.env) file for examples of environment variables needed

    ```bash
    heroku config:set HOST=<Your heroku app url> GOOGLE_CLIENT_ID=<your Google CLIENT_ID> GOOGLE_CLIENT_SECRET=<your Google CLient secret> NODE_ENV=production
    ```
7. Change into the ```prod_public``` folder.

8. If you have deployed your own client app based on the [vuetify-feedback-front repo](https://github.com/Tinitto/vuetify-feedback-front), edit the ```index.html``` by changing line 18 from

    ```JavaScript
    var redirectUrl = deviceType === 'Desktop'? 'https://feedback.sopherapps.com/': 'https://feedback.sopherapps.com/';
    ```

    to:

    ```JavaScript
    var redirectUrl = deviceType === 'Desktop'? '<the url of your deployed client app>': '<the url of your deployed client app>';
    ```
9. Save and commit to master.

    ```bash
    cd .. && git add . && git commit -m "Change Production Client app URL"
    ```

10. Push to heroku

    ```bash
    git push heroku master
    ```

11. Visit the Docs of your server to see the possible operations that can be done on the server. The url will be at ```<Your heroku app url>/docs```

12. You can then test out your back end by visiting the url ```https://feedback.sopherapps.com?backendUrl=<Your heroku app url>``` in your browser. (Be sure to replace '```<Your heroku app url>```' with the heroku app url). You can also run the client app locally if you follow the instructions given on the [vuetify-feedback-front repo](https://github.com/Tinitto/vuetify-feedback-front#on-development-machine)

## Embedding Link in web applications

After the deployment of the server, you will want your client app to direct the user responses to the right back end. A helper app was designed to auto-generate floating button HTML code that can links to a rating app configured to send responses to a back end server of your choice.

All you need is to do is:

1. Visit the helpder app. It is hosted on Github pages at [https://tinitto.github.io/feedback-button/](https://tinitto.github.io/feedback-button/)
2. Feed in the URL of your back end server
3. You can change the words that will appear when a user hovers on the floating button
4. Click the ```Copy Code``` button and your code will be copied to the Clipboard
5. Go to any of your web applications and add that code to the html page where you want the button to be seen
6. Taa-dah, save and deploy that web application and your users can start rating your apps.

## Related Apps

This app works hand-in-hand with the following apps.

1. The [floating button HTML code generator](https://https://tinitto.github.io/feedback-button/) for generating embeddeable floating button HTML code customized to link to a user-rating app configured with the appropriate back end server of the user's choice
2. The [front end](https://feedback.sopherapps.com) where the actual rating of applications occurs.

## Related Repositories

The repositories of the apps above can be found on Github.

1. The floating button HTML code generator: [feedback-button](https://github.com/Tinitto/feedback-button)
2. The front end: [vuetify-feedback-front](https://github.com/vuetify-feedback-front)

## Acknowledgements

The demo of the back end app is hosted, free of charge, by [heroku](https://heroku.com) at [https://vuetify-feedback-api.herokuapp.com](https://vuetify-feedback-api.herokuapp.com/docs).

The demo of the front end app is hosted, free of charge, by [Firebase](https://firebase.google.com) at [https://feedback.sopherapps.com?backendUrl=https://vuetify-feedback-api.herokuapp.com](https://feedback.sopherapps.com?backendUrl=https://vuetify-feedback-api.herokuapp.com)

[This gist by josepaiva94](https://gist.github.com/josepaiva94/ee7d4b8d659500aeb5846142e25bd411#file-verifier-js) really helped a lot in dealing with duplicated users when using feathersjs authentication and google Oauth strategy.