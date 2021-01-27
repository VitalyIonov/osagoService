import PropTypes from 'prop-types';
import React from 'react';
import { TextField as MUITextField, FormControl, FormHelperText, } from '@material-ui/core';

import { block, classNames } from 'common/utils/classNames';

import './index.less';

const cnTextField = block('text-field');

const TextField = ({ className, required, input, disabled, placeholder, type, meta, label, normalizer }) => {
  const handleChange = (event) => {
    const newValue = normalizer ? normalizer(event.target.value) : event.target.value;

    input.onChange(newValue);
  };

  const hasError = !!(meta.touched && meta.error);

  return (
    <FormControl className={classNames(className, cnTextField())} error={hasError}>
      <MUITextField
        className={cnTextField('input')}
        required={required}
        {...input}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        label={label}
        variant="outlined"
        size="small"
        onChange={handleChange}
        error={hasError}
      />
      <FormHelperText>{hasError ? meta.error : ''}</FormHelperText>
    </FormControl>
  );
};

TextField.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  normalizer: PropTypes.func
};

export default TextField;
