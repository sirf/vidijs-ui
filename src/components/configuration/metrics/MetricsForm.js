import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormSection from '../../ui/FormSection';
import Field from '../../ui/Field';
import BoolCheckbox from '../../ui/BoolCheckbox';
import FieldArray from '../../ui/FieldArray';

const StatsdReporterType = () => (
  <React.Fragment>
    <Field
      name="host"
      component={TextField}
      fullWidth
    />
    <Field
      name="port"
      component={TextField}
      fullWidth
    />
    <Field
      name="prefix"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={
        <Field
          name="tags"
          component={BoolCheckbox}
        />
      }
      label="Tags"
    />
    <FieldArray
      name="exclude"
      label="Exclude Filter"
      component={TextField}
      fullWidth
    />
    <FieldArray
      name="include"
      label="Include Filter"
      component={TextField}
      fullWidth
    />
  </React.Fragment>
);

const MetricsConfigurationType = () => (
  <React.Fragment>
    <FormSection
      name="statsd"
      component={StatsdReporterType}
    />
  </React.Fragment>
);


function MetricsForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="metricsConfigurationDocument"
        component={MetricsConfigurationType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(MetricsForm);
