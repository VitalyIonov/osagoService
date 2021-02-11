import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, FormControl, FormHelperText, CircularProgress } from '@material-ui/core';
import { Autocomplete as MUIAutocomplete } from '@material-ui/lab';

import { block, classNames } from 'common/utils/classNames';
import { useFetcher } from 'common/hooks';

import './index.less';

const cnAsyncAutocomplete = block('async-autocomplete');

const AsyncAutocomplete = ({ className, required, label, input, meta, source }) => {
  const [inputValue, setInputValue] = useState(input.value);
  const [open, setOpen] = useState(false);
  const [suggests, isLoading] = useFetcher(source({ q: inputValue }, !(input.value && open)));

  useEffect(() => {
    setInputValue(input.value);
  }, [input.value]);

  const handleAddressChange = (event, newValue) => {
    input.onChange(newValue?.first_name);
  };

  const handleInputChange = (event) => {
    input.onChange(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hasError = !!(meta.touched && meta.error);

  return (
    <FormControl className={classNames(className, cnAsyncAutocomplete())} error={hasError}>
      <MUIAutocomplete
        id={input.name}
        inputValue={inputValue}
        options={suggests?.data || []}
        getOptionLabel={(option) => option.first_name}
        open={open}
        filterOptions={(options) => options}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleAddressChange}
        renderInput={(params) => (
          <TextField
            {...params}
            name={input.name}
            required={required}
            label={label}
            variant="outlined"
            size="small"
            error={hasError}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
              value: inputValue
            }}
            onChange={handleInputChange}
            onBlur={(event) => input.onBlur(event)}
          />
        )}
      />
      <FormHelperText>{hasError ? meta.error : ''}</FormHelperText>
    </FormControl>
  );
};

AsyncAutocomplete.propTypes = {
  className: PropTypes.string,
  initialValue: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  input: PropTypes.object,
  options: PropTypes.array,
  meta: PropTypes.object,
  source: PropTypes.func
};

export default AsyncAutocomplete;
