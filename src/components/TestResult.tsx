import * as React from 'react';

interface TestResultProps {
    testDate: string;
    allChecksPassed: boolean;
    namesOfFailedTests: string[];
    rawResult: string;
}

interface TestResultState {
    detailsShown: boolean;
}

class TestResult extends React.Component<TestResultProps, TestResultState> {
    constructor(props: TestResultProps) {
        super(props);
        this.state = { detailsShown: false };
    }

    render() {
        const failedTestsNames = this.props.namesOfFailedTests;
        let failedTests = null;
        if (failedTestsNames.length > 0) {
            failedTests = <b>Failed tests: {failedTestsNames.join(", ")}</b>
        }
        let details = null;
        if (this.state.detailsShown) {
            details = <>{failedTests}<br /><textarea defaultValue={this.props.rawResult} cols={120} rows={5}></textarea></>;
        }
        return (<div className={'test-result ' + (this.state.detailsShown ? 'test-result-details' : '')}>
            <a onClick={this.toogleDetails}>
                <img src={this.props.allChecksPassed ? "img/check_green.png" : "img/cross_red.png"} title={"Last Check:" + this.props.testDate} width="32" height="32" />
            </a>
            {details}
        </div>);
    }

    toogleDetails = (): void => {
        this.setState({
            ...this.state,
            detailsShown: !this.state.detailsShown
        });
    }
}

export default TestResult;
