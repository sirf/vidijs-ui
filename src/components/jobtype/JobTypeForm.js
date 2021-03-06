import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';


const queryParams = () => (
  <React.Fragment>
    <Field
      name="id"
      component={TextField}
      fullWidth
    />
  </React.Fragment>
);

const ExportLocationForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <Field
      name="jobType"
      component={TextField}
      fullWidth
    />
    <FormSection
      name="queryParams"
      component={queryParams}
    />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(ExportLocationForm);
