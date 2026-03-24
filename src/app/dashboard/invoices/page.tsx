import Pagination from '@/components/invoices/Pagination';
import Search from '@/components/Search';
import Table from '@/components/invoices/InvoicesTable';
import { CreateInvoice } from '@/components/invoices/Buttons';
import { lusitana } from '@/components/fonts';
import { InvoicesTableSkeleton } from '@/components/Skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/lib/data';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/*
          NOTE: Suspense is not working with search params, so we need to use a fallback .
          This addition was not in the tutorial. And resolves a Vercel runtime error, while
          in development of this tutorial. Perhaps a change later in the tutorial addresses
          this issue.
        */}
        <Suspense
          fallback={<div className="h-10 w-full max-w-sm rounded-md bg-gray-100" />}
        >
          <Search placeholder="Search invoices..." />
        </Suspense>
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
