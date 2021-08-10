import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

export default function useUser({ redirectTo = '/' }) {
  const { data, isLoading } = useSWR('/api/user');

  useEffect(() => {
    if (data && redirectTo) {
      Router.push(redirectTo);
    }
  }, [data]);

  return { data, isLoading };
}
