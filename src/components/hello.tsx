import * as React from 'react';

export interface Props {
    name: string;
    enthusiasm?: number;
}

class Hello extends React.Component<Props, object> {
    render() {
        const { name, enthusiasm = 1} = this.props;
        if (enthusiasm <= 0) {
            throw new Error("Test");
        }

        return (
            <div>
                Hello {name + Array(enthusiasm+1).join('!')}
            </div>
        );
    }
}

export default Hello;