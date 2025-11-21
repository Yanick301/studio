import { Button } from "@/components/ui/button";
import Link from 'next/link';

export function UserNav() {
  // In a real app, you'd have logic to show a user avatar dropdown when logged in.
  // This component currently shows the logged-out state.
  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Button asChild variant="ghost" className="text-sm px-2 sm:px-4">
          <Link href="/login">Anmelden</Link>
      </Button>
      <Button asChild className="text-sm hidden sm:inline-flex">
          <Link href="/signup">Registrieren</Link>
      </Button>
    </div>
  );
}
