import React from 'react';
import { Form, Field } from 'react-final-form';
import { Button } from '@material-ui/core';

import { ContentContainer } from 'common/components/ContentContainer';
import { FormBlock, FORM_BLOCK_TYPES } from 'common/components/FormBlock';
import { TextField, Select, DatePicker, Autocomplete, AsyncAutocomplete, Checkbox, TextFieldMask, RadioButtons } from 'common/components/form';
import { block } from 'common/utils/classNames';
import {
  INSURANCE_PERIODS,
  INSURANCE_SERIES,
  VEHICLE_BRANDS,
  VEHICLE_MODELS,
  VEHICLE_CATEGORIES,
  USAGE_PURPOSES,
  DOCUMENT_TYPES,
  GENDERS,
  DRIVERS
} from 'common/constants/form';
import { composeValidators, required, isValidPhone, isValidEmail } from 'common/utils/validation';
import { normalizeNumberByLength } from 'common/utils/normalization';
import { isObjectEmpty } from 'common/utils/data';
import { getAddress } from 'common/sources/aggregator';

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
                  onClick={() => form.reset({ drivers: DRIVERS[0].value })}
                >
                  Очистить форму
                </Button>
              </div>
              <div className={cnAggregation('section')}>
                <FormBlock title="ИНФОРМАЦИЯ О СТРАХОВКЕ" type={FORM_BLOCK_TYPES.row}>
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
                      disabled={values['without-auto-number']}
                      required
                      component={TextField}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field', { l: true })}
                      name="without-auto-number"
                      label="Без гос. номера"
                      component={Checkbox}
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
                      name="vehicle-category"
                      label="Категория"
                      required
                      component={Select}
                      validate={required}
                      options={VEHICLE_CATEGORIES}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="vehicle-year"
                      label="Год выпуска"
                      normalizer={normalizeNumberByLength(4)}
                      placeholder="2019"
                      type="number"
                      required
                      component={TextField}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="vehicle-power"
                      label="Мощность"
                      normalizer={normalizeNumberByLength(3)}
                      placeholder="999"
                      type="number"
                      required
                      component={TextField}
                      validate={required}
                    />
                  </div>
                  <div className={cnAggregation('row')}>
                    <Field
                      className={cnAggregation('field')}
                      name="usage-purpose"
                      label="Цель использования"
                      required
                      component={Select}
                      validate={required}
                      options={USAGE_PURPOSES}
                    />
                  </div>
                  <div className={cnAggregation('row')}>
                    <Field
                      className={cnAggregation('field')}
                      name="document-type"
                      label="Тип документа"
                      required
                      component={Select}
                      validate={required}
                      options={DOCUMENT_TYPES}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="document-series"
                      label="Серия"
                      normalizer={normalizeNumberByLength(4)}
                      placeholder="99AA"
                      required
                      component={TextField}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="document-number"
                      label="Номер"
                      normalizer={normalizeNumberByLength(6)}
                      placeholder="999999"
                      type="number"
                      required
                      component={TextField}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="document-from"
                      label="Дата выдачи"
                      placeholder="01.01.2019"
                      required
                      component={DatePicker}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="vin"
                      label="VIN"
                      normalizer={normalizeNumberByLength(16)}
                      placeholder="9999999999999999"
                      type="number"
                      required
                      component={TextField}
                      validate={required}
                    />
                  </div>
                  <div className={cnAggregation('row')}>
                    <Field
                      className={cnAggregation('field')}
                      name="dk-number"
                      label="Номер ДК"
                      normalizer={normalizeNumberByLength(9)}
                      placeholder="999999999"
                      type="number"
                      required
                      component={TextField}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="dk-duration"
                      label="Срок действия ДК"
                      placeholder="01.01.2025"
                      required
                      component={DatePicker}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field', { l: true })}
                      name="with-trailer"
                      label="Используется с прицепом"
                      component={Checkbox}
                    />
                  </div>
                </FormBlock>
              </div>
              <div className={cnAggregation('section')}>
                <FormBlock title="СТРАХОВАТЕЛЬ">
                  <div className={cnAggregation('row')}>
                    <Field
                      className={cnAggregation('field')}
                      name="surname"
                      label="Фамилия"
                      placeholder="Иванов"
                      required
                      component={TextField}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="name"
                      label="Имя"
                      placeholder="Иван"
                      required
                      component={TextField}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="patronymic"
                      label="Отчество"
                      placeholder="Иванович"
                      component={TextField}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="birth-date"
                      label="Дата рождения"
                      placeholder="01.01.1999"
                      required
                      component={DatePicker}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="gender"
                      label="Пол"
                      required
                      component={Select}
                      validate={required}
                      options={GENDERS}
                    />
                  </div>
                </FormBlock>
                <FormBlock title="ПАСПОРТ">
                  <div className={cnAggregation('row')}>
                    <Field
                      className={cnAggregation('field')}
                      name="passport-series"
                      label="Серия"
                      placeholder="9999"
                      type="number"
                      required
                      normalizer={normalizeNumberByLength(4)}
                      component={TextField}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="passport-number"
                      label="Номер"
                      placeholder="999999"
                      type="number"
                      required
                      normalizer={normalizeNumberByLength(6)}
                      component={TextField}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="passport-from"
                      label="Дата выдачи"
                      placeholder="01.01.1999"
                      required
                      component={DatePicker}
                      validate={required}
                    />
                  </div>
                  <div className={cnAggregation('row')}>
                    <Field
                      className={cnAggregation('field', { xxl: true })}
                      name="address"
                      label="Адрес"
                      required
                      source={getAddress}
                      component={AsyncAutocomplete}
                      validate={required}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="email"
                      label="Email"
                      placeholder="email@mail.ru"
                      required
                      component={TextField}
                      validate={composeValidators(required, isValidEmail)}
                    />
                    <Field
                      className={cnAggregation('field')}
                      name="phone"
                      label="Телефон"
                      maskChar=" "
                      required
                      placeholder="+7(999)999-99-99"
                      mask="+7(999)999-99-99"
                      component={TextFieldMask}
                      validate={composeValidators(required, isValidPhone)}
                    />
                  </div>
                </FormBlock>
              </div>
              <div className={cnAggregation('section')}>
                <FormBlock title="СОБСТВЕННИК" type={FORM_BLOCK_TYPES.row}>
                  <Field
                    className={cnAggregation('field', { l: true })}
                    name="owner"
                    label="Совпадает со страхователем"
                    component={Checkbox}
                  />
                </FormBlock>
              </div>
              <div className={cnAggregation('section')}>
                <FormBlock title="ВОДИТЕЛИ" type={FORM_BLOCK_TYPES.row}>
                  <Field
                    className={cnAggregation('field', { ['auto-size']: true })}
                    name="drivers"
                    initialValue={DRIVERS[0].value}
                    scheme={DRIVERS}
                    component={RadioButtons}
                  />
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
