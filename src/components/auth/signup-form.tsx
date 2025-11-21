import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function SignupForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Registrieren</CardTitle>
        <CardDescription>
          Erstellen Sie ein Konto, um ein personalisiertes Erlebnis zu genießen.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="full-name">Vollständiger Name</Label>
          <Input id="full-name" placeholder="Vorname Nachname" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Passwort</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Button className="w-full">Konto erstellen</Button>
        <div className="mt-4 text-center text-sm w-full">
          Haben Sie bereits ein Konto?{" "}
          <Link href="/login" className="underline font-semibold">
            Anmelden
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
