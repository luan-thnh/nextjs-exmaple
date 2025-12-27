'use client';

import type * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<React.ComponentProps<'button'>, 'name' | 'type' | 'defaultValue'> {
  name: TName;
  control: ControllerProps<TFieldValues, TName>['control'];
  label?: string;
  isRequired?: boolean;
}

export function DateField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, label, isRequired, ...props }: Props<TFieldValues, TName>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          {label && <FormLabel isRequired={isRequired}>{label}</FormLabel>}
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'border-primary-100 h-11 w-full justify-start text-left font-normal text-black shadow-xs transition-[color,box-shadow]',
                    !field.value && 'text-muted-foreground',
                    props.className,
                  )}
                  {...props}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    typeof field.value === 'string' ? (
                      format(new Date(field.value), 'dd/MM/yyyy')
                    ) : (
                      format(field.value, 'dd/MM/yyyy')
                    )
                  ) : (
                    <span>Chọn ngày</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={field.onChange}
                  fromYear={1900}
                  toYear={new Date().getFullYear() + 10}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
