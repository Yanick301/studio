import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function OrdersPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Mes Commandes</CardTitle>
                <CardDescription>Consultez l'historique de vos commandes.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Vous n'avez pas encore passé de commande.</p>
            </CardContent>
        </Card>
    );
}
