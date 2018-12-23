# Vuetify Feedback Mobile RN(React Native)

This is a very simple React Native app that transforms the mobile-ready Vuetify based vuetify-feedback-front into a native mobile app thanks to React Native's webview

## Customization

The back end of this app can be changed easily.
Just change ```source``` attribute of the ```WebView``` component in [App.js](App.js) from

```JavaScript
source={{uri: 'https://feedback.sopherapps.com?backendUrl=https://vuetify-feedback-api.herokuapp.com'}}
```

to:

```JavaScript
source={{uri: '<your client app url>?backendUrl=<your server api url>'}}
```

__To set up a server api app, look at the steps found on the [feedback-api repo](https://github.com/Tinitto/feedback-api#deployment)__

__To set up a client app, look at the steps found on the [vuetify-feedback-front repo](https://github.com/Tinitto/vuetify-feedback-front#on-server)__

## Deployment

The people at [Expo](https://expo.io/) have written some good documentation about the same. They include:

1. [Deploying to the App stores](https://docs.expo.io/versions/v31.0.0/guides/app-stores.html)
2. [Building Standalone apps](https://docs.expo.io/versions/v31.0.0/guides/building-standalone-apps.html)
3. [Publishing](https://docs.expo.io/versions/v31.0.0/workflow/publishing)

## Demo

Get the app on [Expo](https://exp.host/@tinitto/feedback-feedback-example)

## Acknowledgements

The Privacy Policy and the Terms and Conditions were generated using [the Firebase generator](https://app-privacy-policy-generator.firebaseapp.com/) created by [Nishant](http://www.nisrulz.com/)

The Docs were generated using [docsify](https://docsify.js.org/#/?id=docsify)

The app itself was built using [Expo](https://expo.io/)

