import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ApiMutationOptions, ApiQueryOptions } from '@/types/react-query';

import { postKeys } from './keys';
import { postRequests } from './requests';
import { CreatePostRequest, Post, UpdatePostRequest } from './types';

export const usePostsQuery = (options?: ApiQueryOptions<Post[]>) => {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: postRequests.getPosts,
    ...options,
  });
};

export const usePostQuery = (id: number, options?: ApiQueryOptions<Post>) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postRequests.getPost(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreatePostMutation = (options?: ApiMutationOptions<Post, CreatePostRequest>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePostRequest) => postRequests.createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
    ...options,
  });
};

export const useUpdatePostMutation = (options?: ApiMutationOptions<Post, UpdatePostRequest>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdatePostRequest) => postRequests.updatePost(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(data.id) });
    },
    ...options,
  });
};

export const useDeletePostMutation = (options?: ApiMutationOptions<void, number>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => postRequests.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
    ...options,
  });
};
