import {Amplify} from 'aws-amplify';
import pkceChallenge from 'react-native-pkce-challenge';

const {codeChallenge, codeVerifier} = pkceChallenge();

const awsConfig = {
  Auth: {
    // (required) only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

    // (required)- Amazon Cognito Region
    region: 'us-west-2',

    // (optional) - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: 'XX-XXXX-X',

    // (optional) - Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_VGOUuN5NH',

    // (optional) - Amazon Cognito Web Client ID (26-char alphanumeric string, App client secret needs to be disabled)
    userPoolWebClientId: '4j3nism2gqdcbu4hu2bhjbpfe8',

    // (optional) - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // (optional) - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    // - Cookie domain (only required if cookieStorage is provided)
    // domain: '.yourdomain.com',
    // (optional) - Cookie path
    // path: '/',
    // (optional) - Cookie expiration in days
    // expires: 365,
    // (optional) - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    // sameSite: 'strict' | 'lax',
    // (optional) - Cookie secure flag
    // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    // secure: true
    // },

    // (optional) - customized storage object
    // storage: MyStorage,

    // (optional) - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_PASSWORD_AUTH',

    // (optional) - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: 'myCustomValue' },
    // (optional) - Hosted UI configuration
    oauth: {
      domain: 'scenario-one-domain.auth.us-west-2.amazoncognito.com',
      scope: [
        'phone',
        'email',
        'profile',
        'openid',
        'aws.cognito.signin.user.admin',
      ],
      //   redirectUri: 'rncognitodemo://signin/',
      redirectSignIn: 'rncognitodemo://signin/',
      redirectSignOut: 'rncognitodemo://signin/',
      clientId: '4j3nism2gqdcbu4hu2bhjbpfe8',
      responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
      //   codeChallengeMethod: 'S256',
      //   codeChallenge: codeChallenge,
    },
  },
};

// const redirectSignIn = awsConfig.Auth.oauth.redirectSignIn.split(',');
// const redirectSignOut = awsConfig.Auth.oauth.redirectSignOut.split(',');

// const updatedAwsConfig = {
//   ...awsConfig,
//   Auth: {
//     ...awsConfig.Auth,
//     oauth: {
//       ...awsConfig.Auth.oauth,
//       redirectSignIn: redirectSignIn,
//       redirectSignOut: redirectSignOut,
//     },
//   },
// };

Amplify.configure(awsConfig);

export default awsConfig;
