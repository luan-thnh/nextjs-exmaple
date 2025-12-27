import { useState } from 'react';
import { Post, useDeletePost, useUpdatePost } from '@/apis/post';
import { PostFormValues } from '@/libs/validation/post';
import { Loader2, Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';

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

import { PostDialog } from './post-dialog';

interface PostActionsProps {
  post: Post;
}

export function PostActions({ post }: PostActionsProps) {
  const t = useTranslations('common');
  const tDashboard = useTranslations('dashboard');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const deleteMutation = useDeletePost();
  const updateMutation = useUpdatePost();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(post.id);
      toast.success('Success');
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error('Error');
      console.error(error);
    }
  };

  const handleUpdate = async (values: PostFormValues) => {
    try {
      await updateMutation.mutateAsync({ id: post.id, ...values });
      toast.success('Updated successfully');
      setShowEditDialog(false);
    } catch (error) {
      toast.error('Error');
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={() => setShowEditDialog(true)}>
          <Pencil className="h-4 w-4" />
          <span className="sr-only">{t('edit')}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">{t('delete')}</span>
        </Button>
      </div>

      <PostDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        post={post}
        onSubmit={handleUpdate}
        loading={updateMutation.isPending}
      />

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tDashboard('dialog.delete.title')}</DialogTitle>
            <DialogDescription>{tDashboard('dialog.delete.description')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              {t('cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
