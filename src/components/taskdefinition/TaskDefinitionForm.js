import React from 'react';

import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { required } from '../../utils/FieldValidation';
import BoolCheckbox from '../ui/BoolCheckbox';
import CodeField from '../ui/CodeField';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

import { StatefulAsyncSelect } from '../ui/Select';
import { loadJobTypeOptions } from '../jobtype/JobTypeSelect';

const TaskDefinitionDependency = () => (
  <React.Fragment>
    <Field
      name="step"
      type="number"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={
        <Field
          name="previous"
          component={BoolCheckbox}
        />
      }
      label="Previous"
    />
    <FormControlLabel
      control={
        <Field
          name="allPrevious"
          component={BoolCheckbox}
        />
      }
      label="All Previous"
    />
  </React.Fragment>
);

const TaskDefinitionType = () => (
  <React.Fragment>
    <Field
      name="jobType"
      label="Job Type"
      component={StatefulAsyncSelect}
      loadOptions={loadJobTypeOptions}
      disableInitial
      cacheOptions
      isClearable
      fullWidth
    />
    <Field
      name="step"
      label="Step"
      component={TextField}
      validate={[required]}
      type="number"
      required
      fullWidth
    />
    <Field
      name="description"
      label="Description"
      component={TextField}
      fullWidth
    />
    <Field
      name="flags"
      label="Flags"
      component={TextField}
      type="number"
      fullWidth
    />
    <FormControlLabel
      control={
        <Field
          name="critical"
          component={BoolCheckbox}
        />
      }
      label="Critical"
    />
    <FormControlLabel
      control={
        <Field
          name="cleanup"
          component={BoolCheckbox}
        />
      }
      label="Cleanup"
    />
    <FormSection
      name="dependency"
      label="dependency"
      component={TaskDefinitionDependency}
    />
    <FormSection
      name="parallelDependency"
      label="parallelDependency"
      component={TaskDefinitionDependency}
    />
    <Field
      name="script"
      label="script"
      component={CodeField}
      options={{
        theme: 'material',
        mode: 'application/json',
        lineWrapping: true,
        lineNumbers: true,
      }}
    />
    <Field
      name="jobType"
      type="hidden"
      component="input"
    />
  </React.Fragment>
);

function TaskDefintionForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="taskDefinitionDocument"
        component={TaskDefinitionType}
      />
      <button type="submit" hidden />
    </form>
  );
}


export default reduxForm()(TaskDefintionForm);
