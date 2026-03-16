import Pagination from '@/app/_ui/invoices/pagination';
import Search from '@/app/_ui/search';
import Table from '@/app/_ui/invoices/table';
import { CreateInvoice } from '@/app/_ui/invoices/buttons';
import { lusitana } from '@/app/_ui/fonts';
import { InvoicesTableSkeleton } from '@/app/_ui/skeletons';
import { Suspense } from 'react';
 
export default async function Page() {
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
        <Suspense fallback={ <div className="h-10 w-full max-w-sm rounded-md bg-gray-100" /> } >
          <Search placeholder="Search invoices..." />
        </Suspense>
        <CreateInvoice />
      </div>
      {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
