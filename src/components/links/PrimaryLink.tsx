import * as React from 'react';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

const PrimaryLinkSize = ['medium', 'small'] as const;
const PrimaryLinkVariant = [
  'primary',
  'secondary',
  'success',
  'danger',
] as const;

type PrimaryLinkProps = {
  size?: (typeof PrimaryLinkSize)[number];
  variant?: (typeof PrimaryLinkVariant)[number];
  underline?: boolean;
} & UnstyledLinkProps;

const PrimaryLink = React.forwardRef<HTMLAnchorElement, PrimaryLinkProps>(
  (
    {
      className,
      children,
      size = 'medium',
      variant = 'primary',
      underline = true,
      ...rest
    },
    ref,
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'button inline-flex items-center justify-center font-semibold',
          'focus:outline-none focus-visible:ring',
          'transition duration-150',
          'decoration-current hover:decoration-white/0 active:decoration-current disabled:hover:decoration-current',
          underline && 'underline',
          //*=========== Size ===========
          size === 'medium' && 'text-md md:text-lg ',
          size === 'small' && 'md:text-md text-sm',
          //*======== Size ===========
          //*=========== Variant ===========
          variant === 'primary' && [
            'text-primary-500 hover:text-primary-600 active:text-primary-700',
          ],
          variant == 'success' && [
            'text-success-500 hover:text-success-600 active:text-success-700',
          ],
          variant == 'danger' && [
            'text-danger-500 hover:text-danger-600 active:text-danger-700',
          ],
          //*======== Variant ===========
          className,
        )}
      >
        {children}
      </UnstyledLink>
    );
  },
);

export default PrimaryLink;
