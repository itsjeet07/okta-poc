import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import About from './components/about';
import Home from './components/home';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import CorsErrorModal from './components/CorsErrorModal';
import AuthRequiredModal from './components/AuthRequiredModal';
import Admin from './components/admin';

const oktaConfig = {
  clientId: '0oaeqxe0bjOT7r8Vr697',
  issuer: 'https://trial-2265925.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};

const App: React.FC = () => {
  
  const [corsErrorModalOpen, setCorsErrorModalOpen] = useState(false);
  const [authRequiredModalOpen, setAuthRequiredModalOpen] = useState(false);
  const [pathname] = useState(window.location.pathname);

  const pageOktaAuth = new OktaAuth(oktaConfig);

  const triggerLogin = async () => {
    await pageOktaAuth.signInWithRedirect();
  };

  const restoreOriginalUri = (oktaAuth: OktaAuth, originalUri: any) => {
    if (pathname !== '/login/callback') {
      window.location.href = pathname;
    } else {
      window.location.href = '/';
    }
    // history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
    // navigate(originalUri || '/');
    // setRxjsFromOkta(oktaAuth);
  };

  const customAuthHandler = async () => {
    const previousAuthState = pageOktaAuth.authStateManager.getPreviousAuthState();
    if (!previousAuthState || !previousAuthState.isAuthenticated) {
      // App initialization stage
      await triggerLogin();
      // window.location.href = "/";
    } else {
      // Ask the user to trigger the login process during token autoRenew process
      setAuthRequiredModalOpen(true);
    }
  };

  return (
    <Router>
      <Security oktaAuth={pageOktaAuth} onAuthRequired={customAuthHandler} restoreOriginalUri={restoreOriginalUri}>
        <CorsErrorModal {...{ corsErrorModalOpen, setCorsErrorModalOpen }} />
        <AuthRequiredModal {...{ authRequiredModalOpen, setAuthRequiredModalOpen, triggerLogin }} />

        {/* <Switch> */}
          <Route path="/login/callback" component={LoginCallback} />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <SecureRoute exact path="/admin"  component={Admin} />
        {/* </Switch> */}
      </Security>
    </Router>
  );
};

export default App;
