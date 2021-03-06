import React from 'react';
import ItemMetadataListCard from '../../components/item/ItemMetadataListCard';
import ItemMetadataDisplayParams from '../../components/item/ItemMetadataDisplayParams';

import { item as api } from '@vidijs/vidijs-api';
import withSnackbar from '../../hoc/withSnackbar';


class ItemMetadata extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      metadataListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillReceiveProps({ itemId }) {
    const { itemId: prevItemId } = this.props;
    if (prevItemId !== itemId) {
      this.onFetch(itemId);
      document.title = `vidi.js | Item | ${itemId}`;
    }
  }

  onRefresh() {
    const { itemId } = this.props;
    this.onFetch(itemId);
  }

  onFetch(itemId) {
    try {
      api.getItemMetadata({ itemId })
        .then(response => this.setState({ metadataListDocument: response.data }))
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Item';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }


  render() {
    const {
      itemId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { metadataListDocument } = this.state;
    return (
      <React.Fragment>
        {TitleComponent && (
          <TitleComponent
            code={metadataListDocument}
            codeModal="MetadataListDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <ItemMetadataDisplayParams
          itemId={itemId}
          onSuccess={response => this.setState({ metadataListDocument: response.data })}
        />
        {metadataListDocument && (
          <ItemMetadataListCard
            itemId={itemId}
            metadataListDocument={metadataListDocument}
            onSuccess={() => this.onRefresh()}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withSnackbar(ItemMetadata);
