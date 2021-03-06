import { SubmissionError } from 'redux-form';

import * as api from '../api/audit';
import * as actions from '../actions';

export function onSubmit(form, dispatch, props) {
  const {
    first,
    rows,
    orderDirection,
  } = props;
  const queryParams = {
    first,
    rows,
    performCount: true,
    sort: orderDirection,
    ...form,
  };
  return api.listAuditLogs({ queryParams })
    .then(response => response.data)
    .then(auditLogDocument => ({ auditLogDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onSubmitFail(errors, dispatch) {
  const { openSnackBar } = actions.ui;
  const messageContent = 'Error Filtering Logs';
  dispatch(openSnackBar({ messageContent, messageColor: 'secondary' }));
}

export function onSubmitSuccess(response, dispatch) {
  const { receiveAuditLogs } = actions.audit;
  const { auditLogDocument } = response;
  dispatch(receiveAuditLogs({ auditLogDocument }));
}
