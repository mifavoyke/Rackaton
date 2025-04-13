import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, HeartPulse } from 'lucide-react'
import { getDictionary } from "@/lib/dictionary"

export default function Home() {
  const dict = getDictionary('cs')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <HeartPulse className="h-24 w-24 text-pink-500 dark:text-pink-400" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {dict.title}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {dict.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
          >
            <Link href="/cs/predict">
              {dict.startPredicting} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/cs/about">{dict.learnMore}</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <Card>
          <CardHeader>
            <CardTitle>{dict.evidenceBased}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{dict.evidenceBasedDesc}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{dict.personalized}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{dict.personalizedDesc}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{dict.clinicalSupport}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{dict.clinicalSupportDesc}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 p-6 bg-muted rounded-lg">
        <p className="text-center text-sm">
          {dict.disclaimer}
        </p>
      </div>
    </div>
  )
}