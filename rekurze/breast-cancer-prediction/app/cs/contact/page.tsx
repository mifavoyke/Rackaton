import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Kontaktujte nás</h1>

        <Card>
          <CardHeader>
            <CardTitle>Spojte se s námi</CardTitle>
            <CardDescription>
              Máte otázky nebo zpětnou vazbu k predikčnímu nástroji? Pošlete nám zprávu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">Jméno</Label>
                <Input id="first-name" placeholder="Zadejte své jméno" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Příjmení</Label>
                <Input id="last-name" placeholder="Zadejte své příjmení" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Zadejte svou emailovou adresu" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Předmět</Label>
              <Input id="subject" placeholder="Zadejte předmět vaší zprávy" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Zpráva</Label>
              <Textarea id="message" placeholder="Zadejte svou zprávu" rows={5} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
              Odeslat zprávu
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}