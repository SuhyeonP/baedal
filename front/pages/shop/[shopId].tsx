import React, { useState } from 'react';
import Link from 'next/link';
import AppLayout from '../../components/Layout';

const Shop = () => {
  const [use, setUse] = useState('');
  return (
    <>
      <AppLayout>
        <Link href="/">
          <a>Go to home</a>
        </Link>
        <div>
          <p>shopName</p>
        </div>
      </AppLayout>
    </>
  );
};

export default Shop;
