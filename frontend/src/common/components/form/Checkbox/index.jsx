import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as MUICheckbox, FormControlLabel } from '@material-ui/core';

import { block, classNames } from 'common/utils/classNames';

import './index.less';

const cnCheckbox = block('checkbox');

const Checkbox = ({ className, input, label }) => {
  const handleChange = (value) => {
    input.onChange(value);
  };

  return (
    <FormControlLabel
      className={classNames(className, cnCheckbox())}
      control={(
        <MUICheckbox
          checked={Boolean(input.value)}
          onChange={handleChange}
          name={input.name}
          color="primary"
        />
      )}
      label={label}
    />
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
};

export default Checkbox;
