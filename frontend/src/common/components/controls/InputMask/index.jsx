import React from 'react';
import PropTypes from 'prop-types';
// import MaskedInput from 'react-text-mask';
import MaskedInput from 'react-input-mask';
import PhoneInput from 'react-phone-number-input';

import { block, classNames } from 'common/utils/classNames';

import './index.less';

const cnInputMask = block('input-mask');

const InputMask = ({ className, inputRef, mask, maskChar, placeholder, ...rest }) => {
  // return (
  //   <MaskedInput
  //     {...rest}
  //     className={classNames(className, cnInputMask())}
  //     ref={(ref) => {
  //       inputRef(ref ? ref.inputElement : null);
  //     }}
  //     type="tel"
  //     mask={mask}
  //     placeholderChar={'\u2000'}
  //     showMask
  //     keepCharPositions={false}
  //   />
  // );

  // return (
  //   <PhoneInput
  //     {...rest}
  //     country="RUS"
  //     className={classNames(className, cnInputMask())}
  //   />
  // );

  return (
    <MaskedInput
      {...rest}
      className={classNames(className, cnInputMask())}
      placeholder={placeholder}
      mask={mask}
      maskChar={maskChar}
    />
  );
};

InputMask.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  maskChar: PropTypes.string,
  mask: PropTypes.string,
  inputRef: PropTypes.func,
};

export default InputMask;
