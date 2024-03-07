import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

const IconButtonVariant = [
  'primary',
  'success',
  'danger',
  'outline',
  'ghost',
  'warning',
] as const;
const IconButtonSize = ['xs', 'sm', 'base', 'lg'] as const;

type IconButtonProps = {
  isLoading?: boolean;
  variant?: (typeof IconButtonVariant)[number];
  size?: (typeof IconButtonSize)[number];
  icon?: IconType;
  iconClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      size = 'base',
      icon: Icon,
      iconClassName,
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
              'min-h-[2.75rem] min-w-[2.75rem] md:min-h-[3rem] md:min-w-[3rem]',
              'text-base',
            ],
            size === 'base' && [
              'min-h-[2.25rem] min-w-[2.25rem] md:min-h-[2.5rem] md:min-w-[2.5rem]',
              'text-sm md:text-base',
            ],
            size === 'sm' && [
              'min-h-[1.75rem] min-w-[1.75rem] md:min-h-[2rem] md:min-w-[2rem]',
              'text-xs md:text-sm',
            ],
            size === 'xs' && ['p-1', 'text-xs md:text-sm'],
          ],
          //#region  //*=========== Variants ===========
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
        {Icon && <Icon size='1em' className={clsxm(iconClassName)} />}
      </button>
    );
  },
);

export default IconButton;
