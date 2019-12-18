/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { Grid, Row } from 'patternfly-react';
import { formFieldsMapper, layoutMapper } from '../src'
import { schema, uiSchema, conditionalSchema, arraySchema, uiArraySchema } from './demo-schemas/widget-schema';
import miqSchema from './demo-schemas/miq-schema';
import wizardSchema from './demo-schemas/wizard-schema';
import sandbox from './demo-schemas/sandbox';
import Switch from "../src/form-fields/switch-field";

const selectSchema = {
  fields: [{
    component: 'select-field',
    name: 'select',
    label: 'Select',
    isRequired: true,
    validateOnMount: true,
    menuIsOpen: true,
    isClearable: true,
    validate: [{
      type: 'required-validator'
    }],
    options: [{
      label: 'foo',
      value: 123
    }, {
      label: 'bar',
      value: 231
    }]
  }]
}

class App extends React.Component {
  render() {
    const initialValues = {
      date_control_1: new Date()
    }
    return (
    <div>
      <h1>Pf3 component mapper</h1>
      <Grid>
        <Row>
          <FormRenderer
            initialValues={initialValues}
            onSubmit={console.log}
            schemaType="default"
            formFieldsMapper={formFieldsMapper}
            layoutMapper={layoutMapper}
            schema={selectSchema}
            onCancel={() => console.log('cancel')}
          />
        </Row>
      </Grid>
    </div>
  )}
}

ReactDOM.render(<App />, document.getElementById('root'));
