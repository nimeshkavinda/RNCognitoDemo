/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Linking,
  Button,
  ScrollView,
} from 'react-native';
import styles from './styles';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import {Amplify, Auth, Hub} from 'aws-amplify';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import awsconfig from './aws-exports';

async function urlOpener(url: string, redirectUrl: string) {
  await InAppBrowser.isAvailable();
  const res = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (res.type === 'success') {
    await Linking.openURL(res.url);
  }
}

Amplify.configure({
  ...awsconfig,
  Auth: {
    ...awsconfig.Auth,
    oauth: {
      ...awsconfig.Auth.oauth,
      urlOpener,
    },
  },
});

function App(): JSX.Element {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  console.log('USER: ', user);

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.headingWrapper}>
          <Text style={styles.title}>OAuth SSO Demo</Text>
          <Text style={styles.userData}>
            User: {user ? user.username : 'None'}
          </Text>
        </View>
        <View style={styles.formWrapper}>
          <TextInput
            placeholder="Email address"
            style={styles.input}
            // onChangeText={onChange}
            // value={email}
          />

          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            style={styles.input}
            // onChangeText={onChange}
            // value={password}
          />

          <TouchableOpacity
            style={[styles.socialLoginButton, {marginTop: 14}]}
            onPress={() => Auth.federatedSignIn()}>
            <Text style={styles.socialLoginLabel}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.socialLoginWrapper}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <TouchableOpacity
            style={styles.socialLoginButton}
            onPress={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Amazon,
              })
            }>
            <Text style={styles.socialLoginLabel}>Login with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialLoginButton, {marginTop: 14}]}
            onPress={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google,
              })
            }>
            <Text style={styles.socialLoginLabel}>Login with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialLoginButton, {marginTop: 14}]}
            onPress={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Facebook,
              })
            }>
            <Text style={styles.socialLoginLabel}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>
        <Button title="Sign out" onPress={() => Auth.signOut()} />
      </ScrollView>
    </View>
  );
}

export default App;
