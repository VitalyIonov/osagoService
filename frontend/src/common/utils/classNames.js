import { withNaming } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

const block = withNaming({ e: '__', m: '--', v: '-' });

export { block, classnames as classNames };
