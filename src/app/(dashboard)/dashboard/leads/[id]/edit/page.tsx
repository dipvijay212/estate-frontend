import React from 'react';

// @ts-expect-error - Next.js 15 params type workaround for mock data
export default function EditLeadPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Edit Lead: {params.id}</h1>
    </div>
  );
}
