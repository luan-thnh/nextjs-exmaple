import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export type ApiQueryOptions<TData> = Omit<UseQueryOptions<TData, Error>, 'queryKey'>;
export type ApiMutationOptions<TData, TVariables> = UseMutationOptions<TData, Error, TVariables>;
