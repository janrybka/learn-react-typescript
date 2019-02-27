import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import AppTester from './components/AppTester';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Health Check Monitor</h1>
        </header>
        <AppTester name="develop CI" url="nppapi-develop-ci.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
        <AppTester name="develop QA" url="nppapi-develop-qa.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
        <AppTester name="release CI" url="nppapi-release-ci.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
        <AppTester name="release QA" url="nppapi-release-qa.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
        <AppTester name="demo CI" url="nppapi-demo-ci.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
        <AppTester name="demo QA" url="nppapi-demo-qa.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
        <AppTester name="UAT" url="nppapi-uat.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />        
      </div>
    );

    //<AppTester name="Staging" url="nppapi-staging.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
    //<AppTester name="Live" url="nppapi.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
  }
}

export default App;
