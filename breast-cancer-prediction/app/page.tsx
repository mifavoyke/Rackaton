import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, HeartPulse } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <HeartPulse className="h-24 w-24 text-pink-500 dark:text-pink-400" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Breast Cancer Recurrence Prediction
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A clinical tool to predict the risk of breast cancer recurrence based on patient and tumor characteristics.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
          >
            <Link href="/predict">
              Start Predicting <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Evidence-Based</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Our prediction model is based on comprehensive clinical data and validated research.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Personalized</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get individualized predictions based on specific patient and tumor characteristics.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Clinical Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Designed to assist healthcare professionals in treatment planning and patient counseling.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 p-6 bg-muted rounded-lg">
        <p className="text-center text-sm">
          This tool is designed to support clinical decision-making but should not replace professional medical advice.
          Always consult with healthcare providers for diagnosis and treatment decisions.
        </p>
      </div>
    </div>
  )
}
