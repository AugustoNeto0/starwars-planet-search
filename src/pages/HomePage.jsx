import React from 'react';
import Filters from '../components/Filters';
import SortOptions from '../components/SortOptions';
import Table from '../components/Table';

export default function HomePage() {
  return (
    <>
      <SortOptions />
      <Filters />
      <Table />
    </>
  );
}
