import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Radio, RadioGroup, FormControl, FormControlLabel } from '@material-ui/core';

import { block, classNames } from 'common/utils/classNames';

import './index.less';

const cnRadioButtons = block('radio-buttons');

const RadioButtons = ({ className, scheme, initialValue, input }) => {
  useEffect(() => {
    input.onChange(initialValue);
  }, [initialValue]);

  const handleChange = (event) => {
    input.onChange(event.target.value);
  };

  return (
    <FormControl className={classNames(className, cnRadioButtons())} component="fieldset">
      <RadioGroup
        className={cnRadioButtons('group')}
        aria-label={input.name}
        name={input.name}
        value={input.value}
        onChange={handleChange}
      >
        {scheme.map(({ value, label }) => {
          return (
            <FormControlLabel
              key={value}
              className={cnRadioButtons('item')}
              value={value}
              control={<Radio />}
              label={label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

RadioButtons.propTypes = {
  className: PropTypes.string,
  initialValue: PropTypes.string,
  scheme: PropTypes.array,
  input: PropTypes.object,
};

export default RadioButtons;
