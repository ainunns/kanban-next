import * as React from 'react';
import { IconType } from 'react-icons';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

const IconLinkVariant = [
  'primary',
  'success',
  'danger',
  'outline',
  'ghost',
  'warning',
] as const;
const IconLinkSize = ['xs', 'sm', 'base', 'lg'] as const;

type IconLinkProps = {
  variant?: (typeof IconLinkVariant)[number];
  size?: (typeof IconLinkSize)[number];
  icon?: IconType;
  iconClassName?: string;
} & Omit<UnstyledLinkProps, 'children'>;

const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    {
      className,
      icon: Icon,
      variant = 'outline',
      size = 'base',
      iconClassName,
      ...rest
    },
    ref,
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        type='button'
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
          className,
        )}
        {...rest}
      >
        {Icon && <Icon size='1em' className={clsxm(iconClassName)} />}
      </UnstyledLink>
    );
  },
);

export default IconLink;
