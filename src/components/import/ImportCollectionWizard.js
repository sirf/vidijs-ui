import React from 'react';
import { compose } from 'redux';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import { CollectionDocumentForm, CollectionQueryParamsForm } from '../collection/CollectionForm';
import SquareCard from '../ui/SquareCard';
import * as formActions from '../../formactions/collection';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import withStepper from '../../hoc/withStepper';

export const EDIT_COLLECTION_FORM = 'EDIT_COLLECTION_FORM';

function ImportCollectionWizard({
  onSuccess,
  onFail,
  submitForm,
  onNext,
  onBack,
  activeStep,
  openSnackBar,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Collection Created';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Collection';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <React.Fragment>
      <Grid container justify="flex-end">
        <Grid item>
          <Button
            color="primary"
            variant="raised"
            size="large"
            onClick={() => submitForm(EDIT_COLLECTION_FORM)}
          >
            Create
          </Button>
        </Grid>
      </Grid>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Collection</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <CollectionQueryParamsForm
                  onSubmit={formActions.onCreate}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_COLLECTION_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <ExpansionPanelActions>
                <Button
                  variant="raised"
                  color="primary"
                  onClick={onNext}
                >
                  Next
                </Button>
              </ExpansionPanelActions>
            </SquareCard>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Document</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <CollectionDocumentForm
                  onSubmit={formActions.onCreate}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_COLLECTION_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <ExpansionPanelActions>
                <Button onClick={onBack}>
                  Back
                </Button>
              </ExpansionPanelActions>
            </SquareCard>
          </StepContent>
        </Step>
      </Stepper>
    </React.Fragment>
  );
}

export default compose(withStepper, withUI, withFormActions)(ImportCollectionWizard);
