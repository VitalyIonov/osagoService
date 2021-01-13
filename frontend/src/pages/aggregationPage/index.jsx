import React from 'react';

import { block } from 'common/utils/classNames';

import './index.less';

const cnAggregation = block('aggregation');

const AggregationPage = () => {
  return (
    <div className={cnAggregation()}>
      КОНТЕНТ
    </div>
  )
}

export default AggregationPage;
