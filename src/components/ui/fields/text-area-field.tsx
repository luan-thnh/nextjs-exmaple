import type * as React from 'react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export interface TextAreaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'size'> {
  name: TName;
  control: ControllerProps<TFieldValues, TName>['control'];
  label?: string;
  isRequired?: boolean;
  size?: 'default' | 'sm' | 'lg';
}

export function TextAreaField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, isRequired, size, ...textareaProps }: TextAreaFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      name={textareaProps.name}
      control={textareaProps.control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel isRequired={isRequired}>{label}</FormLabel>}
          <FormControl>
            <Textarea {...field} {...textareaProps} className="min-h-37.5" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
