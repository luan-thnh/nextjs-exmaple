'use client';

import { useState } from 'react';
import { useCreatePost, usePosts } from '@/apis/post';
import { PostFormValues } from '@/libs/validation/post';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { useTranslations } from '@/hooks/use-translations';
import { Button } from '@/components/ui/button';

import { PostDialog } from './components/post-dialog';
import { PostsTable } from './components/posts-table';

function DashboardPage() {
  const t = useTranslations('dashboard');
  const { data: posts, isLoading } = usePosts();
  const createMutation = useCreatePost();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (values: PostFormValues) => {
    try {
      await createMutation.mutateAsync({ ...values, userId: 1 });
      toast.success('Created successfully');
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Error');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="text-primary-600 h-8 w-8 animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: t('stats.totalPosts'), value: posts?.length || 0, change: '+12%', icon: '📝' },
    { label: t('stats.totalViews'), value: '24.5k', change: '+5.2%', icon: '👀' },
    { label: t('stats.activeUtils'), value: '12', change: '+2%', icon: '⚡' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                  <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-600">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="text-2xl opacity-80 grayscale">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{t('recentPosts.title')}</h2>
            <p className="text-sm text-slate-500">{t('recentPosts.description')}</p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-primary-600 shadow-primary-200 hover:bg-primary-700 text-white shadow-md"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t('recentPosts.newPost')}
          </Button>
        </div>

        <div className="p-6">
          <PostsTable data={posts || []} total={posts?.length || 0} />
        </div>
      </div>

      <PostDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        post={null}
        onSubmit={onSubmit}
        loading={createMutation.isPending}
      />
    </div>
  );
}

export default DashboardPage;
