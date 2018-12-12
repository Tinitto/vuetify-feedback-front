export default function(err, authenticate, successCallback) {
  if (err.className == "not-authenticated") {
    authenticate()
      .then(() => {
        console.log("signing in");
        successCallback();
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    throw err;
  }
}
