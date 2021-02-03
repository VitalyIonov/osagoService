import React from 'react';
import PropTypes from 'prop-types';
import { OutlinedInput, Input, FormControl, InputLabel, FormHelperText } from '@material-ui/core';

import { InputMask } from 'common/components/controls';
import { block, classNames } from 'common/utils/classNames';

import './index.less';

const cnTextFieldMask = block('text-field-mask');

const TextFieldMask = ({ className, input, label, required, mask, meta, placeholder, maskChar }) => {
  const handleChange = (event) => {
    input.onChange(event.target.value);
  };

  const hasError = !!(meta.touched && meta.error);

  return (
    <FormControl className={classNames(className, cnTextFieldMask())} size="small" error={hasError}>
      <InputLabel
        className={cnTextFieldMask('label')}
        id={input.name}
        required={required}
        variant="outlined"
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id={input.name}
        value={input.value}
        onChange={handleChange}
        name={input.name}
        required={required}
        label={label}
        size="small"
        inputComponent={InputMask}
        inputProps={{
          mask,
          maskChar,
          placeholder,
          onBlur: (event) => input.onBlur(event),
          onFocus: (event) => input.onFocus(event)
        }}
      />
      <FormHelperText error={hasError}>{hasError ? meta.error : ''}</FormHelperText>
    </FormControl>
  );

  // return (
  //   <FormControl className={classNames(className, cnTextFieldMask())} error={hasError}>
  //     <InputLabel
  //       id={input.name}
  //       className={cnTextFieldMask('label')}
  //       variant="outlined"
  //     >
  //       {label}
  //     </InputLabel>
  //     <OutlinedInput
  //       id={input.name}
  //       value={input.value}
  //       onChange={handleChange}
  //       name={input.name}
  //       required={required}
  //       size="small"
  //       inputComponent={InputMask}
  //       inputProps={{
  //         mask,
  //         placeholder,
  //         onBlur: (event) => input.onBlur(event)
  //       }}
  //     />
  //     <FormHelperText error={hasError}>{hasError ? meta.error : ''}</FormHelperText>
  //   </FormControl>
  // );
};

TextFieldMask.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  maskChar: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  mask: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object
};

export default TextFieldMask;
