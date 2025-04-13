"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PredictionForm } from "@/components/prediction-form"
import { PredictionResults } from "@/components/prediction-results"
import { AlertCircle } from "lucide-react"

export default function PredictPage() {
  const [result, setResult] = useState<{ [key: string]: number } | null>(null)
  const [coxModel, setCoxModel] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const tabsRef = useRef<HTMLDivElement>(null)
  const [diagnosisYear, setDiagnosisYear] = useState<number | null>(null)

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
        throw new Error(data.error || "Predikce selhala")
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
              console.log("Translating and setting Cox model data")
              const translatedCoxModel = data.cox_model.map((item: any) => ({
                ...item,
                variable: translateVariableName(item.variable),
              }))
              console.log("Translated Cox model data:", translatedCoxModel)
              setCoxModel(translatedCoxModel)
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
      alert("Predikce selhala. Zkontrolujte prosím připojení a zkuste to znovu.")
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to translate variable names for Czech version
  const translateVariableName = (name: string): string => {
    if (!name) return "Neznámá proměnná"

    const translations: { [key: string]: string } = {
      "Age (per 10 years)": "Věk (na 10 let)",
      "Tumor Grade 3 vs 1-2": "Stupeň nádoru 3 vs 1-2",
      "Stage III-IV vs I-II": "Stadium III-IV vs I-II",
      "Radiotherapy (Yes vs No)": "Radioterapie (Ano vs Ne)",
      "Chemotherapy (Yes vs No)": "Chemoterapie (Ano vs Ne)",
      "Targeted Therapy (Yes vs No)": "Cílená terapie (Ano vs Ne)",
    }

    return translations[name] || name
  }

  const handleReset = () => {
    setResult(null)
    setCoxModel(null)
    setActiveTab("form")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Nástroj pro predikci recidivy rakoviny prsu</h1>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Důležité</AlertTitle>
          <AlertDescription>
            Tento nástroj předpovídá riziko recidivy rakoviny prsu v průběhu 10 let na základě charakteristik pacienta a
            nádoru. Je určen k pomoci zdravotnickým pracovníkům při plánování léčby a poradenství pacientům.
          </AlertDescription>
        </Alert>

        <p className="mb-8 text-muted-foreground">
          Tento formulář by měl vyplnit zdravotnický pracovník. Pokud jste pacient a neznáte tyto údaje, požádejte svůj
          zdravotnický tým, aby s vámi tento nástroj prošel.
        </p>

        <div ref={tabsRef}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form">Vstupní parametry</TabsTrigger>
              <TabsTrigger value="results" disabled={!result}>
                Výsledky
              </TabsTrigger>
            </TabsList>
            <TabsContent value="form">
              <Card>
                <CardHeader>
                  <CardTitle>Charakteristiky pacienta a nádoru</CardTitle>
                  <CardDescription>Zadejte požadované parametry pro vygenerování predikce recidivy</CardDescription>
                </CardHeader>
                <CardContent>
                  <PredictionForm onSubmit={handleFormSubmit} isLoading={isLoading} lang="cs" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>Výsledky predikce</CardTitle>
                  <CardDescription>Odhadované riziko recidivy rakoviny prsu v průběhu 10 let</CardDescription>
                </CardHeader>
                <CardContent>
                  {result && (
                    <PredictionResults result={result} coxModel={coxModel} lang="cs" diagnosisYear={diagnosisYear} />
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleReset}>
                    Nová predikce
                  </Button>
                  <Button onClick={() => window.print()}>Vytisknout výsledky</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
