import React from 'react';

import TestCard from '../components/javascript/TestCard';

export default class Javascript extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Javascript Test';
  }

  render() {
    const { result } = this.state;
    return (
      <React.Fragment>
        <TestCard
          result={result}
          onSuccess={response => this.setState({ result: JSON.stringify(response.data, null, 2) })}
          onFail={() => this.setState({ result: undefined })}
        />
      </React.Fragment>
    );
  }
}
