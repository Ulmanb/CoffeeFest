import  {
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  LoginManager
} from 'react-native-fbsdk';

// Returns a promise that resolves with either true or false according to
// the current user's FB connection status
export function isConnectedToFB() {
  return new Promise((resolve, reject) => {
      AccessToken.getCurrentAccessToken().then(data => {
      // User has an access token and therfore is logged in via FB
        if (data) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      });
  });
}

// Returns a promise that resolves to the FB Access token.
// Performs login if needs to
// Rejects if login was cancelled
export function getFBAccessToken() {
  return new Promise((resolve, reject) => {
    AccessToken.getCurrentAccessToken()
    .then(data => {
      if(!data)
        return LoginManager.logInWithReadPermissions(['user_friends'])
        .then(result => {
          if(result.isCancelled) {
            reject(new Error("Login cancelled"));
          }
          else {
            resolve(AccessToken.getCurrentAccessToken());
          }
        });
      resolve(data);
    });
  });
}

export function getUsingFBFriends() {
  return getFBFriends('/me/friends');
}

export function getTaggableFBFriends() {
  return getFBFriends('/me/taggable_friends');
}

function getFBFriends(route) {
  return getFBAccessToken()
  .then((data) => {
    const { accessToken } = data;
    return new Promise((resolve, reject) => {
      const infoRequest = new GraphRequest(
        route,
        {
          accessToken,
          parameters: {
            // limit: '100',
            fields: {
              string: 'id,name,picture'
            }
          }
        },
        (err, results) => {
          if(err)
            return reject(err);
          return resolve(results);
        }
      // responseInfoCallback
      );

      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  });
}
