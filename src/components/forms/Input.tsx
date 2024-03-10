import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';
import { HiEye, HiEyeOff } from 'react-icons/hi';

import ErrorMessage from '@/components/forms/ErrorMessage';
import HelperText from '@/components/forms/HelperText';
import LabelText from '@/components/forms/LabelText';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

export type InputProps = {
  id: string;
  label?: string;
  helperText?: string;
  helperTextClassName?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  prefix?: string;
  suffix?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  type = 'text',
  readOnly = false,
  prefix,
  suffix,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftIconClassName,
  rightIconClassName,
  helperTextClassName,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = React.useState(false);
  const error = get(errors, id);

  return (
    <div className='w-full space-y-1.5 rounded-md'>
      {label && (
        <LabelText required={validation?.required ? true : false}>
          {label}
        </LabelText>
      )}

      <div className='relative flex w-full rounded-md'>
        <div className='pointer-events-none absolute h-full w-full rounded-md ring-1 ring-inset ring-typo-outline' />
        {prefix && (
          <Typography
            variant='c1'
            className='flex items-center rounded-l-md bg-typo-light px-3 text-sm text-typo-secondary'
          >
            {prefix}
          </Typography>
        )}

        <div
          className={clsxm(
            'relative w-full rounded-md',
            prefix && 'rounded-l-md',
            suffix && 'rounded-r-md',
          )}
        >
          {LeftIcon && (
            <div
              className={clsxm(
                'absolute left-0 top-0 h-full',
                'flex items-center justify-center pl-2.5',
                'text-lg text-typo-icon md:text-xl',
                leftIconClassName,
              )}
            >
              <LeftIcon />
            </div>
          )}

          <input
            {...register(id, validation)}
            type={
              type === 'password' ? (showPassword ? 'text' : 'password') : type
            }
            id={id}
            name={id}
            readOnly={readOnly}
            disabled={readOnly}
            className={clsxm(
              'h-full w-full rounded-md border-none px-3 py-3',
              [LeftIcon && 'pl-9', RightIcon && 'pr-9'],
              'focus:ring-2 focus:ring-inset',
              'bg-transparent font-poppins text-sm text-typo-primary',
              'placeholder:font-poppins placeholder:text-typo-icon',
              readOnly && 'cursor-not-allowed',
              error
                ? 'border-none ring-1 ring-inset ring-danger-500 focus:ring-danger-500 '
                : 'focus:ring-primary-500',
              prefix && 'rounded-l-none rounded-r-md',
              suffix && 'rounded-l-md rounded-r-none',
              prefix && suffix && 'rounded-none',
              className,
            )}
            aria-describedby={id}
            {...rest}
          />

          {RightIcon && type !== 'password' && (
            <div
              className={clsxm(
                'absolute bottom-0 right-0 h-full',
                'flex items-center justify-center pr-2.5',
                'text-lg text-typo-icon md:text-xl',
                rightIconClassName,
              )}
            >
              <RightIcon />
            </div>
          )}

          {type === 'password' && (
            <div
              className={clsxm(
                'absolute bottom-0 right-0 h-full',
                'flex items-center justify-center pr-3',
                'text-typo-label text-lg md:text-xl',
                rightIconClassName,
              )}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </div>
          )}
        </div>

        {suffix && (
          <Typography
            variant='c1'
            className='flex items-center rounded-r-md bg-typo-light px-3 text-sm text-typo-secondary'
          >
            {suffix}
          </Typography>
        )}
      </div>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {!error && helperText && (
        <HelperText helperTextClassName={helperTextClassName}>
          {helperText}
        </HelperText>
      )}
    </div>
  );
}
