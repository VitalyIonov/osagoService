import PropTypes from 'prop-types';
import React from 'react';
import { TextField as MUITextField, FormControl, FormHelperText, } from '@material-ui/core';

import { block, classNames } from 'common/utils/classNames';

import './index.less';

const cnTextField = block('text-field');

const TextField = ({ className, required, input, meta, ...rest }) => {
  const handleChange = (event) => {
    input.onChange(event.target.value);
  };

  const hasError = meta.touched && meta.error;

  return (
    <FormControl className={classNames(className, cnTextField())} error={meta.error}>
      <MUITextField
        className={cnTextField('input')}
        required={required}
        {...input}
        {...rest}
        onChange={handleChange}
        error={hasError}
      />
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

TextField.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  initialValue: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object
};

export default TextField;
