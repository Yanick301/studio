import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function ProfilePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profil</CardTitle>
                <CardDescription>Gérez les informations de votre compte.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">La gestion du profil sera bientôt disponible.</p>
            </CardContent>
        </Card>
    );
}
