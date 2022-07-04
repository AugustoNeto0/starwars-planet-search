import React from 'react';
import Filters from '../components/Filters';
import SortOptions from '../components/SortOptions';
import Table from '../components/Table';
import './HomePage.css';

export default function HomePage() {
  return (
    <>
      <SortOptions />
      <Filters />
      <Table />
    </>
  );
}
