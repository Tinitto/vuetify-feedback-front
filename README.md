# vuetify-feedback-front
A front end for the vuetify feedback showing reports. This is how you get to see the feedback collected as a result of using the [Vuetify feedback form](https://github.com/Tinitto/vuetify-feedback) as a feedback collection tool and the [feedback api](https://github.com/Tinitto/feedback-api) as the backend that stores this feedback. 


## Caution
__This project is still under active development. Don't use it just yet.__

Let the Login be doen on the feddback form using a query param 'externalLogin' that sets the state's attribute of 'LoginService' to active, tries to authenticate, on successful authentication, retrieve the user's access token from the state, turn the LoginSerive to disabled, go back to the app report and use the token to authenticate

That way the backend will have ony one redirect url as was originally designed


