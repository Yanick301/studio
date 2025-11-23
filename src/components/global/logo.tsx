import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="EZENTIALS Home">
      <Image 
        src="/homepage/logo.png" 
        alt="EZENTIALS Logo" 
        width={140} 
        height={40} 
        className="object-contain"
        priority
      />
    </Link>
  );
}
