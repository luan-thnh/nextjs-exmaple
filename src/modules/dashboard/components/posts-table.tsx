'use client';

import { Post } from '@/apis/post';
import { Filter } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { useTranslations } from '@/hooks/use-translations';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { PostActions } from './post-actions';

interface PostsTableProps {
  data: Post[];
  total: number;
}

export function PostsTable({ data, total }: PostsTableProps) {
  const t = useTranslations('dashboard');
  const [search, setSearch] = useQueryState('search', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => Number(value),
  });

  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(total / 10); // Assuming 10 items per page

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder={t('table.filterPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Filter className="mr-2 h-4 w-4" />
              {t('table.columns')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('table.toggleColumns')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>{t('table.headers.title')}</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>{t('table.headers.author')}</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>{t('table.headers.date')}</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('table.headers.title')}</TableHead>
              <TableHead>{t('table.headers.body')}</TableHead>
              <TableHead className="w-[100px] text-right">{t('table.headers.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length ? (
              filteredData.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.body.slice(0, 50)}...</TableCell>
                  <TableCell className="text-right">
                    <PostActions post={post} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  {t('table.noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(Math.max(1, page - 1))}
              className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const p = i + 1;
            return (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={page === p}
                  onClick={() => setPage(p)}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
