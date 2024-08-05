import Form from "@/components/Form";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link href="/admin">Admin</Link>

        <Form />
      </div>
    </main>
  );
}
