import React from 'react';
import { Form, Field } from 'react-final-form';
import { Button } from '@material-ui/core';

import { ContentContainer } from 'common/components/ContentContainer';
import { FormBlock, FORM_BLOCK_TYPES } from 'common/components/FormBlock';
import { TextField, Select, DatePicker, Autocomplete } from 'common/components/form';
import { block } from 'common/utils/classNames';
import { INSURANCE_PERIODS, INSURANCE_SERIES, VEHICLE_BRANDS, VEHICLE_MODELS } from 'common/constants/form';
import { required } from 'common/utils/validation';
import { normalizeNumberByLength } from 'common/utils/normalization';
import { isObjectEmpty } from 'common/utils/data';

import './index.less';

const cnAggregation = block('aggregation');

const AggregationPage = () => {
  const onSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <ContentContainer>
      <div className={cnAggregation()}>
        <Form
          onSubmit={onSubmit}
          initialValues={{ 'vehicle-brand': 'XXX', 'insurance-series': 'XXX', 'insurance-number': '123123' }}
          render={({ handleSubmit, form, errors, submitting, pristine, values }) => (
            <form
              className={cnAggregation('form')}
              onSubmit={handleSubmit}
            >
              <div className={cnAggregation('header')}>
                <h1 className={cnAggregation('title')}>Создать полис Е-ОСАГО</h1>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => form.reset({})}
                >
                  Очистить форму
                </Button>
              </div>
              <div className={cnAggregation('section')}>
                <FormBlock className={cnAggregation('insurance')}>
                  <Field
                    className={cnAggregation('field', { l: true })}
                    name="valid-from"
                    label="Страховка действительна от"
                    required
                    component={DatePicker}
                    validate={required}
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
                </FormBlock>
              </div>
              <div className={cnAggregation('section')}>
                <FormBlock title="ПРЕДЫДУЩИЙ ПОЛИС" type={FORM_BLOCK_TYPES.row}>
                  <Field
                    className={cnAggregation('field')}
                    name="insurance-series"
                    label="Серия"
                    required
                    component={Select}
                    validate={required}
                    options={INSURANCE_SERIES}
                  />
                  <Field
                    className={cnAggregation('field')}
                    name="insurance-number"
                    label="Номер"
                    normalizer={normalizeNumberByLength(10)}
                    placeholder="9999999999"
                    type="number"
                    required
                    component={TextField}
                    validate={required}
                  />
                </FormBlock>
              </div>
              <div className={cnAggregation('section')}>
                <FormBlock title="ТРАНСПОРТНОЕ СРЕДСТВО">
                  <div className={cnAggregation('row')}>
                    <Field
                      className={cnAggregation('field')}
                      name="auto-number"
                      label="Гос. номер"
                      placeholder="т001тт97"
                      required
                      component={TextField}
                      validate={required}
                    />
                  </div>
                  <div className={cnAggregation('row')}>
                    <Field
                      className={cnAggregation('field')}
                      name="vehicle-brand"
                      label="Марка ТС"
                      required
                      component={Autocomplete}
                      validate={required}
                      options={VEHICLE_BRANDS}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="vehicle-model"
                      label="Модель ТС"
                      required
                      component={Autocomplete}
                      validate={required}
                      options={VEHICLE_MODELS}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="vehicle-model"
                      label="Модель ТС"
                      required
                      component={Autocomplete}
                      validate={required}
                      options={VEHICLE_MODELS}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="vehicle-model"
                      label="Модель ТС"
                      required
                      component={Autocomplete}
                      validate={required}
                      options={VEHICLE_MODELS}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="vehicle-model"
                      label="Модель ТС"
                      required
                      component={Autocomplete}
                      validate={required}
                      options={VEHICLE_MODELS}
                    />
                  </div>
                </FormBlock>
              </div>
              <div className={cnAggregation('footer')}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting || pristine || !isObjectEmpty(errors)}
                >
                  Рассчитать
                </Button>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </div>
    </ContentContainer>
  );
};

export default AggregationPage;
