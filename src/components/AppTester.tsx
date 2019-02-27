import * as React from 'react';
import axios from 'axios';
import TestResult from './TestResult';

export interface AppTesterProps {
    name: string;
    url: string;
}

interface HcTestResult {
    testDate: string;
    allChecksPassed: boolean;
    namesOfFailedTests: string[];
    rawResult: string;
}

interface AppTesterState {
    lastTests: HcTestResult[];
    intervalId?: any;
    callIsRunning: boolean;
    historyShown: boolean;
}

export default class AppTester extends React.Component<AppTesterProps, AppTesterState> {
    constructor(props: AppTesterProps) {
        super(props);
        this.state = { lastTests: [], callIsRunning: false, historyShown: false };
    }

    componentDidMount() {
        this.makeHealthCheck();
        var intervalId = setInterval(this.makeHealthCheck.bind(this), 30000);
        // store intervalId in the state so it can be accessed later:
        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount() {
        if (this.state.intervalId != null) {
            clearInterval(this.state.intervalId);
        }
    }

    render() {
        const { name, url } = this.props;
        let latestTest = null;
        let pendingRequest = null;
        if (this.state.callIsRunning) {
            pendingRequest = <img src="img/loader.gif" width="32" height="32" />
        }

        let tests = this.state.lastTests;
        if (this.state.lastTests.length > 0) {
            let lt = tests[0];
            latestTest = <>
                <TestResult allChecksPassed={lt.allChecksPassed} testDate={lt.testDate} namesOfFailedTests={lt.namesOfFailedTests} rawResult={lt.rawResult} />
                
            </>
        }

        let history = null;
        if (this.state.historyShown) {
            const nodes = tests.map(test =>
                <TestResult allChecksPassed={test.allChecksPassed} testDate={test.testDate} namesOfFailedTests={test.namesOfFailedTests} rawResult={test.rawResult} />
            )
            history = <div className='history'>{nodes}</div>;
        }

        return (
            <div className='app-tester'>
                {pendingRequest}
                <a href={"http://" + url} target="_blank">{name}</a>
                {latestTest} 
                <button onClick={this.toogleHistory}>{this.state.historyShown ? "Hide history" : "Show history"}</button>
                {history}
            </div>
        );
    }

    toogleHistory = (): void => {
        this.setState({
            ...this.state,
            historyShown: !this.state.historyShown
        });
    }

    makeHealthCheck(): void {
        const url = this.props.url;
        if (this.state.callIsRunning) {
            return;
        }
        this.setState({
            ...this.state,
            callIsRunning: true
        });
        axios.get('http://localhost:8080/' + url)
            .then(function (response) {
                let result: HcTestResult = {
                    testDate: new Date().toISOString(),
                    allChecksPassed: response.data.allChecksPassed,
                    rawResult: JSON.stringify(response.data),
                    namesOfFailedTests: response.data.checksDetails.filter((test: any) => test.testPassed == false).map((test: any) => test.name),
                };
                return result;
            },
                reason => {
                    let result: HcTestResult = {
                        testDate: new Date().toISOString(),
                        allChecksPassed: false,
                        rawResult: JSON.stringify(reason),
                        namesOfFailedTests: ["all"],
                    };
                    return result;
                })
            .then(data => {
                let prevTests = this.state.lastTests;
                if (prevTests.length > 50)
                    prevTests.pop();
                let tests = [data, ...prevTests];

                this.setState({
                    ... this.state,
                    lastTests: tests,
                    callIsRunning: false,
                });
            });
    }
}
