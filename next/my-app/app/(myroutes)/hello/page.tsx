import Link from 'next/link';

export default function Hello() {
  return (
    <>
      <h1 className='text-lg'>Hello Page</h1>
      <Link href='/'>Go Home</Link>
    </>
  );
}
