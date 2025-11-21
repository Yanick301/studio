import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function ProfilePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profil</CardTitle>
                <CardDescription>Verwalten Sie Ihre Kontoinformationen.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Die Profilverwaltung wird in Kürze verfügbar sein.</p>
            </CardContent>
        </Card>
    );
}
