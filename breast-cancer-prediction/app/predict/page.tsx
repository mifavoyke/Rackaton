"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoCircle } from "@/components/info-circle"
import { PredictionForm } from "@/components/prediction-form"
import { PredictionResults } from "@/components/prediction-results"
import { AlertCircle } from "lucide-react"

export default function PredictPage() {
  const [result, setResult] = useState<{
    "12_month": number
    "36_month": number
    "60_month": number
  } | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an actual API call
      // const res = await axios.post('http://127.0.0.1:8000/predict/', formData)
      // setResult(res.data)

      // For demo purposes, we'll simulate a response after a delay
      setTimeout(() => {
        setResult({
          "12_month": Math.round(Math.random() * 30) / 10,
          "36_month": Math.round(Math.random() * 100) / 10,
          "60_month": Math.round(Math.random() * 200) / 10,
        })
        setIsLoading(false)
      }, 1500)
    } catch (err) {
      console.error(err)
      setIsLoading(false)
      alert("Prediction failed.")
    }
  }

  const handleReset = () => {
    setResult(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Breast Cancer Recurrence Prediction Tool</h1>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            This tool is not designed to be used in all cases. If you are unsure of any inputs or outputs, click on the{" "}
            <InfoCircle /> buttons for more information.
          </AlertDescription>
        </Alert>

        <p className="mb-8 text-muted-foreground">
          A clinician would usually fill this in. If you are a patient and don&apos;t know these inputs, ask your team
          to go through this tool with you. You can change inputs at any time - even after results are displayed.
        </p>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Input Parameters</TabsTrigger>
            <TabsTrigger value="results" disabled={!result}>
              Results
            </TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <Card>
              <CardHeader>
                <CardTitle>Patient and Tumor Characteristics</CardTitle>
                <CardDescription>Enter the required parameters to generate a prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <PredictionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Prediction Results</CardTitle>
                <CardDescription>Estimated risk of breast cancer recurrence</CardDescription>
              </CardHeader>
              <CardContent>{result && <PredictionResults result={result} />}</CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
                <Button onClick={() => window.print()}>Print Results</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
