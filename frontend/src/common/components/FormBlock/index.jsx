import React from 'react';
import PropTypes from 'prop-types';

import { block, classNames } from 'common/utils/classNames';

import './index.less';

const cnFormBlock = block('form-block');

export const FORM_BLOCK_TYPES = {
  column: 'column',
  row: 'row'
};

export const FormBlock = ({ className, title, type, children }) => (
  <div className={classNames(className, cnFormBlock({ type }))}>
    {title && (
      <h2 className={cnFormBlock('title')}>{title}</h2>
    )}
    <div className={cnFormBlock('content')}>
      {children}
    </div>
  </div>
);

FormBlock.defaultProps = {
  type: FORM_BLOCK_TYPES.column
};

FormBlock.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ])
};
