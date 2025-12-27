import axiosInstance from '@/apis/axios';

import { CreatePostRequest, Post, UpdatePostRequest } from './types';

export const postRequests = {
  getPosts: async (): Promise<Post[]> => {
    const { data } = await axiosInstance.get<Post[]>('/posts');
    return data;
  },
  getPost: async (id: number): Promise<Post> => {
    const { data } = await axiosInstance.get<Post>(`/posts/${id}`);
    return data;
  },
  createPost: async (payload: CreatePostRequest): Promise<Post> => {
    const { data } = await axiosInstance.post<Post>('/posts', payload);
    return data;
  },
  updatePost: async ({ id, ...payload }: UpdatePostRequest): Promise<Post> => {
    const { data } = await axiosInstance.put<Post>(`/posts/${id}`, payload);
    return data;
  },
  deletePost: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/posts/${id}`);
  },
};
