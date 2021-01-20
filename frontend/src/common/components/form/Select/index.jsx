import React from 'react';
import PropTypes from 'prop-types';
import { Select as MUISelect, MenuItem, FormControl, FormHelperText, InputLabel } from '@material-ui/core';

import { block, classNames } from 'common/utils/classNames';

import './index.less';

const cnSelect = block('select');

const Select = ({ className, required, initialValue, label, input, meta, options, ...rest }) => {
  const handleChange = (event) => {
    input.onChange(event.target.value);
  };

  const hasError = meta.touched && meta.error;

  return (
    <FormControl className={classNames(className, cnSelect())} error={hasError}>
      <InputLabel htmlFor={input.name} required={required}>{label}</InputLabel>
      <MUISelect
        {...input}
        {...rest}
        value={input.value}
        inputProps={{
          id: input.name,
        }}
        onChange={handleChange}
      >
        <MenuItem value="">Не выбрано</MenuItem>
        {options.map(item => (
          <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
        ))}
      </MUISelect>
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

Select.defaultProps = {
  initialValue: ''
};

Select.propTypes = {
  className: PropTypes.string,
  initialValue: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  input: PropTypes.object,
  options: PropTypes.array,
  meta: PropTypes.array
};

export default Select;
