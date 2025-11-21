import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function OrdersPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Meine Bestellungen</CardTitle>
                <CardDescription>Überprüfen Sie den Verlauf Ihrer Bestellungen.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Sie haben noch keine Bestellungen aufgegeben.</p>
            </CardContent>
        </Card>
    );
}
