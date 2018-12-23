# vuetify-feedback-front

The front end user-rating app with a pluggable back end specified by a query parameter in the URL. With this application, anyone can set up their own application store where his/her users rate his/her selected applications.

This application stores the user ratings in a server whose URL the user specifies through the ```backendUrl``` query parameter. The server can be a clone or a customized version of the feathersjs app found in [the Feedback API repo](https://github.com/Tinitto/feedback-api).

## Dependencies

This lovely pluggable little app is built on top of [Vuejs](https://vuejs.org/) and [Feathersjs](https://feathersjs.com/). Some of the main packages include the following:

1. [Feathersjs v+3.2.3](https://feathersjs.com)
2. [Feathers Vuex v+1.6.2](https://feathers-plus.github.io/v1/feathers-vuex/index.html)
3. [Vuex persist v+2.0.0](https://github.com/championswimmer/vuex-persist)
4. [Vuex v+3.0.1](https://vuex.vuejs.org/)
5. [Vuejs v+2.5.17](https://vuejs.org/)
6. [Vue Moment v+4.0.0](https://github.com/brockpetrie/vue-moment)
7. [Socket.io Client v+2.1.1](https://socket.io/)
8. [Vuetify v1.3.11](https://vuetifyjs.com/en/)

## Demo

A demo of the client (Front end) app is hosted on Firebase at [https://feedbackback.sopherapps.com](https://feedbackback.sopherapps.com?backendUrl=https://vuetify-feedback-api.herokuapp.com) while the demo back end is hosted on heroku at [https://vuetify-feedback-api.herokuapp.com](https://vuetify-feedback-api.herokuapp.com/docs)

__Note__
This same demo of the client can be used for your own production app. All you need is set up your own server and provide the url of that server as the ```backendUrl``` query parameter.

There is a [helper app](https://tinitto.github.io/feedback-button/) where one feeds in the feedback api server url and code is automatically created showing a thumbs up button. The code can be copied by click of a button and added to any part of your html web page. You can also checkout the [repo of the helper app](https://github.com/Tinitto/feedback-button).

## Quick Start

The Quick Start shows how you can start running the app on your development machine or on a Static Sites hosting server lke Firebase (Github pages failed to play well with vue-router).

### On Development Machine

Take note that this is a Vuejs application scaffolded by [Vue cli 3](https://cli.vuejs.org/). Thus if you know your Vuejs stuff, it will be easy to customize if you ever need to do so.

Here are the steps for setting up on a development machine. The steps are based on Ubuntu 16.04 Operating system.

1. Make sure you have nodejs 8 and mongodb installed. You can follow the tutorials for [nodejs](https://websiteforstudents.com/install-the-latest-node-js-and-nmp-packages-on-ubuntu-16-04-18-04-lts/).
2. Clone this repo

    ```bash
    git clone https://github.com/Tinitto/vuetify-feedback-front.git
    ```

3. Enter the vuetify-feedback-front directory

    ```bash
    cd vuetify-feedback-front
    ```

4. Install dependecies

    ```bash
    npm install
    ```

5. Run the development server

    ```bash
    npm run serve
    ```

6. Set up a local server of the feedback API as shown in the steps on the README.md file of the [feedback-api repo](https://github.com/Tinitto/feedback-api) and run it.

7. Go to the url [http://localhost:8080/?backendUrl=http://localhost:3030](http://localhost:8080/?backendUrl=http://localhost:3030) in your browser.

### On Server

To host the application on Firebase, follow the following steps.

1. Install Firebase tools if you haven't done so already

    ```bash
    npm install -g firebase-tools
    ```

2. Create a project on [Firebase](https://console.firebase.google.com/)

3. Using your terminal, log into your account

    ```bash
    firebase login
    ```
4. Build the app for production

    ```bash
    npm run build
    ```

5. From within the directory of this application, initialize firebase using an interactive shell session

    ```bash
    cd vuetify-feedback-front
    ```

    ```bash
    firebase init
    ```

6. In the interactive session that starts, select 'hosting' as the Firebase feature you want added

    ```bash
    ? What Firebase CLI features do you want to setup for this directory?
    Hosting: Configure and deploy Firebase Hosting sites
    ```

7. Select the Firebase project you created earlier

    ```bash
    ? Select a default Firebase project for this directory: 
    <Your newly created project>
    ```

8. Type in the directory where the production build was kept i.e. 'dist'

    ```bash
    ? What do you want to use as your public directory?
    dist
    ```

9. Do not allow Firebase to configure the application as a Single-page app as this will rewrite our index file

    ```bash
    ? Configure as a single-page app (rewrite all urls to /index.html)?
    No
    ```

10. Do not allow Firebase to rewrite anything including the index.html file

    ```bash
    ? File public/index.html already exists. Overwrite?
    No
    ```

11. The interactive shell session will complete initialization by creating a few files

12. Deploy the application to Firebase

    ```bash
    firebase deploy
    ```
13. Set up a local server of the feedback API as shown in the steps on the README.md file of the [feedback-api repo](https://github.com/Tinitto/feedback-api) and run it.

14. Go to the url ```https:<project-name>.firebaseapp.com?backendUrl=http://localhost:3030``` in your browser.`

    __Remember to change the ```backendUrl``` query parameter to your own back end server url (based on [this repo](https://github.com/Tinitto/feedback-api)) if you have deployed one__

## Acknowledgements

The demos are hosted free of charge by:

1. [Heroku](https://heroku.com) (the backend server at [https://vuetify-feedback-api.herokuapp.com](https://vuetify-feedback-api.herokuapp.com/docs))
2. [Firebase](https://firebase.google.com) (the front end at (https://feedback.sopherapps.com))
3. [Github](https://github.com) (the helper app for auto-generating HTML code linking their websites to the user-rating app given they have their own server. It is found at [https://tinitto.github.io/feedback-button/](https://tinitto.github.io/feedback-button/?backendurl=https://vuetify-feedback-api.herokuapp.com))

The code is hosted free of on Github in the following repos

1. The back end: [Feedback Api](https://github.com/Tinitto/feedback-api)
2. The front end: [this very repo](https://github.com/vuetify-feedback-front)
3. The Feedback link HTML code generator: [Feedback Button](https://github.com/Tinitto/feedback-button)
