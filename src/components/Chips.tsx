import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

const CHIPS_SIZE = ['sm', 'base'] as const;
type ChipsSize = (typeof CHIPS_SIZE)[number];

const CHIPS_COLOR = [
  'DEFAULT',
  'primary',
  'success',
  'danger',
  'warning',
] as const;
type ChipsColor = (typeof CHIPS_COLOR)[number];

type ChipsProps = {
  children: React.ReactNode;
  size?: ChipsSize;
  color?: ChipsColor;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const Chips = React.forwardRef<HTMLDivElement, ChipsProps>(
  (
    {
      children,
      className,
      color = 'DEFAULT',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={clsxm(
          [
            size === 'sm' && ['py-0.5 text-xs'],
            size === 'base' && ['py-1 text-sm'],
          ],

          //#region  //*=========== Color ===========
          color === 'DEFAULT' && 'bg-typo-light text-typo-secondary',
          color === 'primary' && 'bg-primary-100 text-primary-700',
          color === 'danger' && 'bg-red-100 text-danger-700',
          color === 'warning' && 'bg-yellow-100 text-warning-700 ',
          color === 'success' && 'bg-green-100 text-success-700',
          //#endregion  //*======== Color ===========

          'inline-flex items-center gap-1 rounded-full px-3 font-medium',
          LeftIcon && 'pl-3',
          RightIcon && 'pr-3',
          className,
        )}
        ref={ref}
        {...rest}
      >
        {LeftIcon && (
          <div>
            <LeftIcon size='1em' className={clsxm(leftIconClassName)} />
          </div>
        )}
        {children}
        {RightIcon && (
          <div>
            <RightIcon size='1em' className={clsxm(rightIconClassName)} />
          </div>
        )}
      </div>
    );
  },
);

export default Chips;
