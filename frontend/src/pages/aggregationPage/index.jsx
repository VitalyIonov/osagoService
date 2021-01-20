import React from 'react';
import { Form, Field } from 'react-final-form';

import { TextField, Select, DatePicker } from 'common/components/form';
import { block } from 'common/utils/classNames';
import { INSURANCE_PERIODS } from 'common/constants/form';
import { required } from 'common/utils/validation';

import './index.less';

const cnAggregation = block('aggregation');

const AggregationPage = () => {
  const onSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <div className={cnAggregation()}>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form
            className={cnAggregation('form')}
            onSubmit={handleSubmit}
          >
            <Field
              className={cnAggregation('field')}
              name="firstName"
              label="Тестовый лейбл"
              required
              component={TextField}
              validate={required}
              hintText="First Name"
              floatingLabelText="First Name"
            />
            <Field
              className={cnAggregation('field')}
              name="insurance-period"
              label="Срок страхования"
              required
              component={Select}
              validate={required}
              options={INSURANCE_PERIODS}
            />
            <Field
              className={cnAggregation('field')}
              name="valid-from"
              label="Страховка действительна от"
              required
              component={DatePicker}
              validate={required}
            />
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
};

export default AggregationPage;
