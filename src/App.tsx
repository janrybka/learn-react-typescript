import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import AppTester from './components/AppTester';

class App extends React.Component {  
  componentDidMount() {
    this.notificationSetup();
  }

  notificationSetup() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        console.log("This browser does not support system notifications");
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function(permission: string) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          new Notification(`Health Check Monitor ready to go.`);
        }
      });
    }
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Health Check Monitor</h1>
        </header>
        <AppTester name="develop CI" url="nppapi-develop-ci.dev.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
        <AppTester name="develop QA" url="nppapi-develop-qa.dev.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
        <AppTester name="develop Demo" url="nppapi-develop-demo.dev.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
        <AppTester name="UAT" url="nppapi-uat.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />        
        <AppTester name="Staging" url="nppapi-staging.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
      </div>
    );

    //<AppTester name="Live" url="nppapi.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
    //<AppTester name="release CI" url="nppapi-release-ci.dev.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
    //<AppTester name="release QA" url="nppapi-release-qa.dev.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
    //<AppTester name="release Demo" url="nppapi-release-demo.dev.britishcouncil.org/api/healthcheck?token=7b5f1937-f875-4619-b5e5-1686bfd9f58f" />
        
  }
}

export default App;
