import React from 'react';

import TransferTitle from '../components/transfer/TransferTitle';
import TransferFilterCard from '../components/transfer/TransferFilterCard';
import TransferCard from '../components/transfer/TransferCard';
import withFormActions from '../hoc/withFormActions';

const TRANSFER_FILTER_FORM = 'TRANSFER_FILTER_FORM';

class Transfer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      transferListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Transfers';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(TRANSFER_FILTER_FORM);
  }

  onSuccess(response) {
    this.setState({ transferListDocument: response.data });
  }

  render() {
    const { transferListDocument } = this.state;
    return (
      <React.Fragment>
        <TransferTitle
          code={transferListDocument}
          codeModal="TransferListDocument"
          onRefresh={this.onRefresh}
        />
        <TransferFilterCard
          form={TRANSFER_FILTER_FORM}
          onSuccess={this.onSuccess}
        />
        {transferListDocument &&
        <TransferCard
          transferListDocument={transferListDocument}
          onSuccess={this.onRefresh}
        />
        }
      </React.Fragment>
    );
  }
}

export default withFormActions(Transfer);
