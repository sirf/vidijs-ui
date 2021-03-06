import React from 'react';

import StorageRuleListTitle from '../components/storagerule/StorageRuleListTitle';
import StorageRuleListCard from '../components/storagerule/StorageRuleListCard';
import StorageRuleDialog from '../components/storagerule/StorageRuleDialog';

import withSnackbar from '../hoc/withSnackbar';
import { storagerule as api } from '@vidijs/vidijs-api';

const STORAGERULE_DIALOG = 'STORAGERULE_DIALOG';

class StorageRuleList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      storageRulesDocument: undefined,
    };
  }
  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | Storage Rule';
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.listStorageRule()
        .then(response => this.setState({ storageRulesDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Getting Storage Rule List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { storageRulesDocument } = this.state;
    return (
      <React.Fragment>
        <StorageRuleListTitle
          onRefresh={this.onRefresh}
          code={storageRulesDocument}
          codeModal="StorageRulesDocument"
          createModal={STORAGERULE_DIALOG}
        />
        { storageRulesDocument &&
          <StorageRuleListCard
            onRefresh={this.onRefresh}
            storageRulesDocument={storageRulesDocument}
          />
        }
        <StorageRuleDialog
          dialogName={STORAGERULE_DIALOG}
          onSuccess={this.onRefresh}
        />
      </React.Fragment>
    );
  }
}


export default withSnackbar(StorageRuleList);
