'use client';

import { useEffect } from 'react';
import { Post } from '@/apis/post';
import { PostFormValues, postSchema } from '@/libs/validation/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useTranslations } from '@/hooks/use-translations';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TextAreaField } from '@/components/ui/fields/text-area-field';
import { TextField } from '@/components/ui/fields/text-field';
import { Form } from '@/components/ui/form';

interface PostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post | null;
  onSubmit: (values: PostFormValues) => Promise<void>;
  loading?: boolean;
}

export function PostDialog({ open, onOpenChange, post, onSubmit, loading }: PostDialogProps) {
  const t = useTranslations('common');
  const tDashboard = useTranslations('dashboard');
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: post?.title || '',
        body: post?.body || '',
      });
    } else {
      form.reset({
        title: '',
        body: '',
      });
    }
  }, [open, post, form]);

  const handleSubmit = async (values: PostFormValues) => {
    await onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {post ? tDashboard('dialog.post.editTitle') : tDashboard('dialog.post.createTitle')}
          </DialogTitle>
          <DialogDescription>
            {post
              ? tDashboard('dialog.post.editDescription')
              : tDashboard('dialog.post.createDescription')}
          </DialogDescription>
        </DialogHeader>
        <Form form={form} onSubmit={handleSubmit} className="space-y-4">
          <TextField
            control={form.control}
            name="title"
            label={tDashboard('form.title')}
            placeholder={tDashboard('form.titlePlaceholder')}
          />
          <TextAreaField
            control={form.control}
            name="body"
            label={tDashboard('form.body')}
            placeholder={tDashboard('form.bodyPlaceholder')}
          />
          <DialogFooter>
            <Button type="submit" loading={loading}>
              {post ? t('saveChanges') : t('create')}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
