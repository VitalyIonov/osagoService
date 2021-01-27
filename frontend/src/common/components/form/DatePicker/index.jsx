import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import ruLocale from 'date-fns/locale/ru';
import DateFnsUtils from '@date-io/date-fns';
import { FormControl } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { block, classNames } from 'common/utils/classNames';

import './index.less';

const cnDatePicker = block('date-picker');

const DatePicker = ({ className, required, label, placeholder, input, meta, disablePast }) => {
  const handleChange = (date) => {
    input.onChange(date);
  };

  const hasError = !!(meta.touched && meta.error);

  return (
    <FormControl className={classNames(className, cnDatePicker())} error={hasError}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <KeyboardDatePicker
          className={cnDatePicker('input')}
          disableToolbar
          id={input.name}
          name={input.name}
          disablePast={disablePast}
          required={required}
          inputVariant="outlined"
          size="small"
          variant="outlined"
          format="dd.MM.yyyy"
          label={label}
          placeholder={placeholder}
          value={input.value || null}
          helperText={hasError ? meta.error : ''}
          error={hasError}
          onBlur={(event) => input.onBlur(event)}
          onChange={handleChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </FormControl>
  );
};

DatePicker.propTypes = {
  className: PropTypes.string,
  disablePast: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object
};

export default DatePicker;
