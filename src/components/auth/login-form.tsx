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

export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Anmelden</CardTitle>
        <CardDescription>
          Geben Sie unten Ihre E-Mail-Adresse ein, um sich bei Ihrem Konto anzumelden.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Passwort</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button className="w-full">Anmelden</Button>
        <div className="text-sm w-full text-center">
          <Link href="#" className="underline text-sm text-muted-foreground hover:text-foreground">
            Passwort vergessen?
          </Link>
        </div>
        <div className="mt-2 text-center text-sm w-full">
          Sie haben noch kein Konto?{" "}
          <Link href="/signup" className="underline font-semibold">
            Registrieren
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
