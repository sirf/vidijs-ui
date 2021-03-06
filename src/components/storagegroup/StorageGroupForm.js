import React from 'react';
import { reduxForm, Field, FormSection } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'redux-form-material-ui';


export const StorageGroupDocumentForm = () => (
  <React.Fragment>
    <Field
      name="name"
      component={TextField}
      label="Group Name"
      fullWidth
    />
  </React.Fragment>
);


function StorageGroupForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="storageGroupDocument"
        component={StorageGroupDocumentForm}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(StorageGroupForm);
