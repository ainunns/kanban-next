'use client';
import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';

import ErrorMessage from '@/components/forms/ErrorMessage';
import HelperText from '@/components/forms/HelperText';
import LabelText from '@/components/forms/LabelText';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

export type TextAreaProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'textarea'>;

export default function TextArea({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  maxLength = 255,
  readOnly = false,
  ...rest
}: TextAreaProps) {
  const [value, setValue] = React.useState('');

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);
  const textArea = register(id, validation);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    textArea.onChange(e);
    setValue(e.currentTarget.value);
  };

  return (
    <div className='w-full space-y-1.5'>
      {label && (
        <LabelText required={validation?.required ? true : false}>
          {label}
        </LabelText>
      )}

      <div className='relative'>
        <textarea
          {...textArea}
          id={id}
          name={id}
          readOnly={readOnly}
          disabled={readOnly}
          maxLength={maxLength}
          onChange={handleChange}
          className={clsxm(
            'w-full rounded-md px-3 py-2.5',
            'border-none ring-1 ring-typo-icon focus:ring-2',
            'bg-transparent font-poppins text-typo-primary',
            'placeholder:font-poppins placeholder:text-typo-icon',
            readOnly && 'cursor-not-allowed',
            error
              ? 'border-none ring-1 ring-inset ring-danger-500 focus:ring-danger-500'
              : 'focus:ring-primary-500',
            className,
          )}
          aria-describedby={id}
          {...rest}
        />

        <Typography
          variant='c1'
          className='absolute bottom-2.5 right-3 text-typo-primary'
        >
          {value.length}/{maxLength}
        </Typography>
      </div>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
