import React from 'react';
import PropTypes from 'prop-types';
import { TextField, FormControl, FormHelperText } from '@material-ui/core';
import { Autocomplete as MUIAutocomplete } from '@material-ui/lab';

import { block, classNames } from 'common/utils/classNames';
import { getArrayItem } from 'common/utils/data';

import './index.less';

const cnAutocomplete = block('autocomplete');

const Autocomplete = ({ className, required, label, input, meta, options }) => {
  const handleChange = (event, newValue) => {
    input.onChange(newValue?.value);
  };

  const hasError = !!(meta.touched && meta.error);

  return (
    <FormControl className={classNames(className, cnAutocomplete())} error={hasError}>
      <MUIAutocomplete
        id={input.name}
        options={options}
        value={getArrayItem(options, (item) => item.value === input.value)}
        getOptionLabel={(option) => option.label}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            name={input.name}
            required={required}
            label={label}
            error={hasError}
            onBlur={(event) => input.onBlur(event)}
          />
        )}
      />
      <FormHelperText>{hasError ? meta.error : ''}</FormHelperText>
    </FormControl>
  );
};

// Autocomplete.defaultProps = {
//   initialValue: ''
// };

Autocomplete.propTypes = {
  className: PropTypes.string,
  initialValue: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  input: PropTypes.object,
  options: PropTypes.array,
  meta: PropTypes.object
};

export default Autocomplete;
