import React from 'react';
import Filters from '../components/Filters';
import SortOptions from '../components/SortOptions';
import Table from '../components/Table';
import projectIntro from '../projectIntro.gif';
import './HomePage.css';

export default function HomePage() {
  return (
    <>
      <div className="main-logo">
        <img src={ projectIntro } alt="Star Wars intro gif" />
      </div>
      <SortOptions />
      <Filters />
      <Table />
    </>
  );
}
