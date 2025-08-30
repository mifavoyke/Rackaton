"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/alert"
import { PredictionForm } from "@/components/prediction-form"
import { PredictionResults } from "@/components/prediction-results"
import { AlertCircle } from "lucide-react"

export default function PredictPage() {
  const [result, setResult] = useState<{ [key: string]: number } | null>(null)
  const [coxModel, setCoxModel] = useState<any[] | null>(null)
  const [diagnosisYear, setDiagnosisYear] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const tabsRef = useRef<HTMLDivElement>(null)

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true)
    try {
      // Store the diagnosis year for the chart
      setDiagnosisYear(formData.rok_dg)

      // Make API call to your backend
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log("API response:", data)

      // Check if the response contains an error message
      if (!response.ok || data.error) {
        console.error("API error:", data.error || "Unknown error")
        throw new Error(data.error || "Prediction failed")
      }

      // Assuming the backend returns both recurrence probabilities and Cox model data
      setResult(data.recurrence_probabilities || data.survival_probabilities || data)

      // Check for Cox model data
      if (data.cox_model) {
        console.log("Cox model data from API:", data.cox_model)

        // Validate the Cox model data structure
        if (Array.isArray(data.cox_model)) {
          console.log("Cox model is an array with length:", data.cox_model.length)

          // Check if the array has items
          if (data.cox_model.length > 0) {
            // Validate the first item to ensure it has the expected properties
            const firstItem = data.cox_model[0]
            console.log("First Cox model item:", firstItem)

            if (firstItem && typeof firstItem === "object") {
              console.log("Setting Cox model data")
              setCoxModel(data.cox_model)
            } else {
              console.error("Cox model items are not in the expected format")
              setCoxModel(null)
            }
          } else {
            console.log("Cox model array is empty")
            setCoxModel(null)
          }
        } else {
          console.error("Cox model is not an array:", typeof data.cox_model)
          setCoxModel(null)
        }
      } else {
        console.log("No Cox model data in the response")
        setCoxModel(null)
      }

      // Switch to results tab
      setActiveTab("results")

      // Scroll to the tabs if needed
      if (tabsRef.current) {
        tabsRef.current.scrollIntoView({ behavior: "smooth" })
      }
    } catch (err) {
      console.error("Error during prediction:", err)
      alert("Prediction failed. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setCoxModel(null)
    setDiagnosisYear(null)
    setActiveTab("form")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Breast Cancer Recurrence Prediction Tool</h1>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            This tool predicts the risk of breast cancer recurrence over 10 years based on patient and tumor
            characteristics. It is designed to assist healthcare professionals in treatment planning and patient
            counseling.
          </AlertDescription>
        </Alert>

        <p className="mb-8 text-muted-foreground">
          This form should be completed by a healthcare professional. If you are a patient and don't know these inputs,
          please ask your healthcare team to go through this tool with you.
        </p>

        <div ref={tabsRef}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                  <CardDescription>
                    Enter the required parameters to generate a recurrence risk prediction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PredictionForm onSubmit={handleFormSubmit} isLoading={isLoading} lang="en" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>Prediction Results</CardTitle>
                  <CardDescription>Estimated risk of breast cancer recurrence over 10 years</CardDescription>
                </CardHeader>
                <CardContent>
                  {result && (
                    <PredictionResults
                      result={result}
                      coxModel={coxModel}
                      lang="en"
                      diagnosisYear={diagnosisYear || undefined}
                    />
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleReset}>
                    New Prediction
                  </Button>
                  <Button onClick={() => window.print()}>Print Results</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
