// app/components/DismissToast.jsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

export default function DismissToast() {
  const pathname = usePathname();
  const previous = useRef(pathname);

  useEffect(() => {
    if (previous.current !== pathname) {
      toast.dismiss(); 
      previous.current = pathname;
    }
  }, [pathname]);

  return null;
}
