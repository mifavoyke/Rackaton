"use client"

import { Card, CardContent } from "@/components/ui/card"
import { InfoCircle } from "@/components/info-circle"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface SurvivalResult {
  [key: string]: number
}

interface CoxModelResult {
  variable: string
  hazard_ratio: number
  p_value: number
  confidence_interval_lower: number
  confidence_interval_upper: number
}

interface PredictionResultsProps {
  result: SurvivalResult
  coxModel?: CoxModelResult[] | null
  lang: string
  diagnosisYear?: number
}

export function PredictionResults({ result, coxModel, lang, diagnosisYear }: PredictionResultsProps) {
  const isEnglish = lang === "en"
  const currentYear = new Date().getFullYear()

  console.log("Result data:", result)
  console.log("Cox model data:", coxModel)

  // Transform the result object into an array for the chart
  // Note: We're now assuming these are recidivism values (higher means worse prognosis)
  const chartData = Object.entries(result)
    .map(([key, value]) => {
      const year = Number.parseInt(key.replace("year_", ""))
      const calendarYear = diagnosisYear ? diagnosisYear + year : currentYear + year
      return {
        year,
        calendarYear,
        recurrence: value * 100, // Convert to percentage
      }
    })
    .sort((a, b) => a.year - b.year)

  // Create a dummy Cox model for testing if needed
  const dummyCoxModel = [
    {
      variable: "Age (per 10 years)",
      hazard_ratio: 1.25,
      p_value: 0.001,
      confidence_interval_lower: 1.1,
      confidence_interval_upper: 1.42,
    },
    {
      variable: "Tumor Grade 3 vs 1-2",
      hazard_ratio: 1.75,
      p_value: 0.0005,
      confidence_interval_lower: 1.35,
      confidence_interval_upper: 2.27,
    },
    {
      variable: "Stage III-IV vs I-II",
      hazard_ratio: 2.3,
      p_value: 0.0001,
      confidence_interval_lower: 1.85,
      confidence_interval_upper: 2.85,
    },
  ]

  // Check if we should use the real Cox model or the dummy one for testing
  const displayCoxModel = coxModel && Array.isArray(coxModel) && coxModel.length > 0 ? coxModel : null

  // Debug the Cox model data
  if (displayCoxModel) {
    console.log("Cox model data to display:", displayCoxModel)
    displayCoxModel.forEach((item, index) => {
      console.log(`Item ${index}:`, item)
      console.log(`  variable: ${item.variable}`)
      console.log(`  hazard_ratio: ${item.hazard_ratio}`)
      console.log(`  p_value: ${item.p_value}`)
      console.log(`  confidence_interval_lower: ${item.confidence_interval_lower}`)
      console.log(`  confidence_interval_upper: ${item.confidence_interval_upper}`)
    })
  } else {
    console.log("No Cox model data to display")
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <h3 className="text-lg font-medium">
            {isEnglish ? "Recurrence Risk Over Time" : "Riziko recidivy v průběhu času"}
          </h3>
          <InfoCircle
            className="ml-2"
            content={
              isEnglish
                ? "This chart shows the estimated risk of cancer recurrence over the next 10 years after diagnosis."
                : "Tento graf ukazuje odhadované riziko recidivy rakoviny v průběhu 10 let po diagnóze."
            }
          />
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={diagnosisYear ? "calendarYear" : "year"}
                label={{
                  value: diagnosisYear
                    ? isEnglish
                      ? "Calendar Year"
                      : "Kalendářní rok"
                    : isEnglish
                      ? "Years after diagnosis"
                      : "Roky po diagnóze",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                domain={[0, 100]}
                label={{
                  value: isEnglish ? "Recurrence Risk (%)" : "Riziko recidivy (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                formatter={(value) => [`${value.toFixed(1)}%`, isEnglish ? "Recurrence Risk" : "Riziko recidivy"]}
                labelFormatter={(label) =>
                  diagnosisYear
                    ? `${isEnglish ? "Year" : "Rok"} ${label}`
                    : `${isEnglish ? "Year" : "Rok"} ${label} ${isEnglish ? "after diagnosis" : "po diagnóze"}`
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="recurrence"
                name={isEnglish ? "Recurrence Risk" : "Riziko recidivy"}
                stroke="#ec4899"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 5, 10].map((year) => {
          const yearKey = `year_${year}`
          const rawValue = result[yearKey]

          if (typeof rawValue !== "number" || isNaN(rawValue)) return null

          const recurrenceValue = rawValue * 100
          console.log("🔥 Result:", result);
          console.log("🔢 Recurrence values:", [1, 5, 10].map(y => result?.[`year_${y}`]));          
          return (
            <Card key={yearKey} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  {isEnglish ? `${year}-Year Recurrence Risk` : `Riziko recidivy za ${year} let`}
                </div>
                <div className="flex items-baseline space-x-2">
                  <div className="text-3xl font-bold">{recurrenceValue.toFixed(1)}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 dark:bg-gray-700">
                  <div
                    className="bg-pink-500 h-2.5 rounded-full"
                    style={{ width: `${recurrenceValue}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>


      {displayCoxModel && (
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium">
              {isEnglish ? "Cox Proportional Hazards Model" : "Cox model proporcionálních rizik"}
            </h3>
            <InfoCircle
              className="ml-2"
              content={
                isEnglish
                  ? "This table shows the hazard ratios and statistical significance of various factors in the prediction model."
                  : "Tato tabulka ukazuje poměry rizik a statistickou významnost různých faktorů v predikčním modelu."
              }
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {isEnglish ? "Variable" : "Proměnná"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {isEnglish ? "Hazard Ratio" : "Poměr rizik"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {isEnglish ? "P-value" : "P-hodnota"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {displayCoxModel.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {item.variable || `Variable ${index + 1}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {typeof item.hazard_ratio === "number" ? item.hazard_ratio.toFixed(2) : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {typeof item.p_value === "number"
                        ? item.p_value < 0.05
                          ? "<0.05"
                          : item.p_value.toFixed(3)
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-muted p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">{isEnglish ? "Interpretation" : "Interpretace"}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {isEnglish
            ? "These results represent the estimated risk of breast cancer recurrence based on the provided patient and tumor characteristics using a Cox Proportional Hazards model."
            : "Tyto výsledky představují odhadované riziko recidivy rakoviny prsu na základě poskytnutých charakteristik pacienta a nádoru s použitím Cox modelu proporcionálních rizik."}
        </p>
        <div className="text-sm space-y-2">
          <p>
            {isEnglish
              ? "The recurrence curve shows the risk of cancer returning over time. Lower values indicate better prognosis."
              : "Křivka recidivy ukazuje riziko návratu rakoviny v průběhu času. Nižší hodnoty indikují lepší prognózu."}
          </p>
          <p>
            {isEnglish
              ? "The hazard ratios in the Cox model indicate the relative risk associated with each factor. Values greater than 1 indicate increased risk, while values less than 1 indicate decreased risk."
              : "Poměry rizik v Cox modelu indikují relativní riziko spojené s každým faktorem. Hodnoty větší než 1 indikují zvýšené riziko, zatímco hodnoty menší než 1 indikují snížené riziko."}
          </p>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p className="font-medium">{isEnglish ? "Important Note:" : "Důležitá poznámka:"}</p>
        <p>
          {isEnglish
            ? "These predictions are estimates based on population data and should be interpreted by healthcare professionals in the context of the individual patient's overall clinical picture. Treatment decisions should not be based solely on these results."
            : "Tyto predikce jsou odhady založené na populačních datech a měly by být interpretovány zdravotnickými pracovníky v kontextu celkového klinického obrazu jednotlivého pacienta. Rozhodnutí o léčbě by neměla být založena pouze na těchto výsledcích."}
        </p>
      </div>
    </div>
  )
}
