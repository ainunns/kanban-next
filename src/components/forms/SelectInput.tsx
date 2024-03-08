import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';
import { FiChevronDown } from 'react-icons/fi';

import ErrorMessage from '@/components/forms/ErrorMessage';
import HelperText from '@/components/forms/HelperText';
import LabelText from '@/components/forms/LabelText';
import clsxm from '@/lib/clsxm';

export type SelectInputProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  readOnly?: boolean;
  placeholder?: string;
} & React.ComponentPropsWithoutRef<'select'>;

export default function SelectInput({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  readOnly = false,
  defaultValue = '',
  placeholder = '',
  children,
  ...rest
}: SelectInputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const error = get(errors, id);
  const value = watch(id);

  return (
    <div className='w-full space-y-1.5 rounded-md'>
      {label && (
        <LabelText required={validation?.required ? true : false}>
          {label}
        </LabelText>
      )}

      <div className='relative'>
        <select
          {...register(id, validation)}
          id={id}
          name={id}
          defaultValue={defaultValue}
          disabled={readOnly}
          className={clsxm(
            'w-full appearance-none truncate rounded-md border-none py-2.5 pl-3 pr-8',
            'ring-1 ring-typo-outline focus:ring-typo-outline',
            'bg-typo-white font-poppins text-sm text-typo-secondary',
            'hover:ring-2 hover:ring-typo-primary',
            readOnly && 'cursor-not-allowed',
            error
              ? 'ring-1 ring-inset ring-danger-500 focus:ring-danger-500'
              : 'focus:ring-typo-outline',
            value && 'ring-primary-500 focus:ring-primary-500',
            className,
          )}
          aria-describedby={id}
          {...rest}
        >
          {placeholder && (
            <option value='' disabled hidden>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
          <FiChevronDown className='text-xl text-typo-outline' />
        </div>
      </div>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
