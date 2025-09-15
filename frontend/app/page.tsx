import { Button } from "../components/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="h-24 w-24 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 text-5xl select-none">
          ♥
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Rackaton: Predict Your Health Outcomes
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Use our evidence-based, personalized tool to predict your health outcomes and get clinical support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/predict">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
            >
              Start Predicting →
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">Learn More</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Evidence-Based</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Our predictions are grounded in the latest clinical research and data.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Personalized</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get results tailored to your unique health profile and needs.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Clinical Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Receive guidance and support from healthcare professionals.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 p-6 bg-muted rounded-lg">
        <p className="text-center text-sm">
          Disclaimer: This tool provides predictions for informational purposes only and is not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  )
}