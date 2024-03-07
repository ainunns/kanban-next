import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

const ButtonVariant = [
  'primary',
  'success',
  'danger',
  'outline',
  'ghost',
  'warning',
] as const;
const ButtonSize = ['sm', 'base', 'lg'] as const;

type ButtonProps = {
  isLoading?: boolean;
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'inline-flex items-center justify-center rounded-lg font-medium',
          'focus:outline-none focus-visible:ring',
          'shadow-sm',
          'transition-colors duration-75',
          //#region  //*=========== Size ===========
          [
            size === 'lg' && [
              'min-h-[2.75rem] px-3.5 md:min-h-[3rem]',
              'text-base',
            ],
            size === 'base' && [
              'min-h-[2.25rem] px-3 md:min-h-[2.5rem]',
              'text-sm md:text-base',
            ],
            size === 'sm' && [
              'min-h-[1.75rem] px-2 md:min-h-[2rem]',
              'text-xs md:text-sm',
            ],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-primary-500 text-white',
              'border border-primary-600',
              'hover:bg-primary-600 hover:text-white',
              'active:bg-primary-700',
              'disabled:bg-primary-700',
              'focus-visible:ring-primary-400',
            ],
            variant === 'success' && [
              'bg-success-500 text-white',
              'border border-success-600',
              'hover:bg-success-600 hover:text-white',
              'active:bg-success-700',
              'disabled:bg-success-700',
              'focus-visible:ring-success-400',
            ],
            variant === 'danger' && [
              'bg-danger-500 text-white',
              'border border-danger-600',
              'hover:bg-danger-600 hover:text-white',
              'active:bg-danger-700',
              'disabled:bg-danger-700',
              'focus-visible:ring-danger-400',
            ],
            variant === 'warning' && [
              'bg-warning-500 text-white',
              'border border-warning-500',
              'hover:bg-warning-600 hover:text-white',
              'active:bg-warning-700',
              'disabled:bg-warning-700',
              'focus-visible:ring-warning-400',
            ],
            variant === 'outline' && [
              'text-typo-primary',
              'border border-gray-300',
              'hover:bg-typo-light focus-visible:ring-primary-400 active:bg-typo-secondary disabled:bg-typo-secondary',
            ],
            variant === 'ghost' && [
              'text-primary-500',
              'shadow-none',
              'hover:bg-primary-50 focus-visible:ring-primary-400 active:bg-primary-100 disabled:bg-primary-100',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className,
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': [
                  'primary',
                  'success',
                  'danger',
                  'warning',
                ].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              },
            )}
          >
            <ImSpinner size={18} className='animate-spin' />
          </div>
        )}
        {LeftIcon && (
          <div
            className={clsxm([
              size === 'lg' && 'mr-3',
              size === 'base' && 'mr-2',
              size === 'sm' && 'mr-1',
            ])}
          >
            <LeftIcon
              size='1em'
              className={clsxm('text-base', leftIconClassName)}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div
            className={clsxm([
              size === 'lg' && 'ml-3',
              size === 'base' && 'ml-2',
              size === 'sm' && 'ml-1',
            ])}
          >
            <RightIcon
              size='1em'
              className={clsxm('text-base', rightIconClassName)}
            />
          </div>
        )}
      </button>
    );
  },
);

export default Button;
