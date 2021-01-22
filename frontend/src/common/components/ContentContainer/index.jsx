import React from 'react';
import PropTypes from 'prop-types';

import { block, classNames } from 'common/utils/classNames';

import './index.less';

const cnContentContainer = block('content-container');

export const containerSize = {
  small: 'small',
  default: 'default',
  large: 'large',
};

export const ContentContainer = ({ size, className, children }) => (
  <div className={classNames(className, cnContentContainer({ size }))}>
    {children}
  </div>
);

ContentContainer.defaultProps = {
  size: containerSize.default
};

ContentContainer.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(Object.keys(containerSize)),
  className: PropTypes.string
};
