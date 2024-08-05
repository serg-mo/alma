import Form from "@/components/Form";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link href="/admin" className="text-blue-600 underline hover:no-underline">Admin</Link>
      <h1 className="text-2xl font-bold mb-4">Form</h1>
      <Form />
    </>
  );
}
