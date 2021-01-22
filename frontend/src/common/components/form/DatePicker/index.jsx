import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { FormControl } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { block, classNames } from 'common/utils/classNames';

import './index.less';

const cnDatePicker = block('date-picker');

const DatePicker = ({ className, required, label, input, meta, disablePast }) => {
  const handleChange = (date) => {
    input.onChange(date);
  };

  const hasError = !!(meta.touched && meta.error);

  return (
    <FormControl className={classNames(className, cnDatePicker())} error={hasError}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={cnDatePicker('input')}
          disableToolbar
          id={input.name}
          name={input.name}
          disablePast={disablePast}
          required={required}
          variant="inline"
          format="MM.dd.yyyy"
          label={label}
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
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object
};

export default DatePicker;
