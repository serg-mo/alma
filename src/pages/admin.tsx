import List from '@/components/List';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const mockAuth = (resp: boolean) => {
  return new Promise<boolean>((resolve) => {
    // NOTE: mocked auth with 1 sec delay
    setTimeout(() => resolve(resp), 1000);
  });
};

export default function Admin() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await mockAuth(true); // mocked response result
      setAuthenticated(result);
    };
    checkAuth();
  }, []);

  if (authenticated === null) {
    return <div>Authenticating...</div>;
  }

  if (!authenticated) {
    return <div>Access Denied</div>;
  }

  return (
    <>
      <Link href="/" className="text-blue-600 underline hover:no-underline">Form</Link>
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <List />
    </>
  );
}
