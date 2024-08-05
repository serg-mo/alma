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
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}
