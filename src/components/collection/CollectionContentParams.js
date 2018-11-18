import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import ExpansionPanel from '../ui/ExpansionPanel';
import CollectionContentParamsForm from './CollectionContentParamsForm';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';
import * as formActions from '../../formactions/collection';

export const COLLECTION_CONTENT_DISPLAY_FORM = 'COLLECTION_CONTENT_DISPLAY_FORM';

function CollectionContentParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Content Display Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Content Display';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="body2" color="textSecondary">
          Content Display Options
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <CollectionContentParamsForm
          form={COLLECTION_CONTENT_DISPLAY_FORM}
          onSubmit={formActions.onGet}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          {...formProps}
        />
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button
          size="small"
          onClick={() => resetForm(COLLECTION_CONTENT_DISPLAY_FORM)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(COLLECTION_CONTENT_DISPLAY_FORM)}
        >
          Update
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

export default compose(withSnackbar, withFormActions)(CollectionContentParams);
