"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { InfoCircle } from "@/components/info-circle"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PredictionResultsProps {
  result: {
    "12_month": number
    "36_month": number
    "60_month": number
  }
}

export function PredictionResults({ result }: PredictionResultsProps) {
  const chartData = [
    {
      name: "12 Months",
      risk: result["12_month"],
      fill: "#ec4899",
    },
    {
      name: "36 Months",
      risk: result["36_month"],
      fill: "#f43f5e",
    },
    {
      name: "60 Months",
      risk: result["60_month"],
      fill: "#e11d48",
    },
  ]

  const getRiskLevel = (value: number) => {
    if (value < 5) return "Low"
    if (value < 15) return "Moderate"
    return "High"
  }

  const getRiskColor = (value: number) => {
    if (value < 5) return "text-green-500 dark:text-green-400"
    if (value < 15) return "text-amber-500 dark:text-amber-400"
    return "text-red-500 dark:text-red-400"
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(result).map(([key, value]) => {
          const period = key.replace("_", " ")
          const riskLevel = getRiskLevel(value)
          const riskColor = getRiskColor(value)

          return (
            <Card key={key} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  {period.charAt(0).toUpperCase() + period.slice(1)} Recurrence Risk
                </div>
                <div className="flex items-baseline space-x-2">
                  <div className="text-3xl font-bold">{value}%</div>
                  <div className={`text-sm font-medium ${riskColor}`}>{riskLevel} Risk</div>
                </div>
                <Progress
                  value={value}
                  max={30}
                  className="h-2 mt-2"
                  indicatorClassName={value < 5 ? "bg-green-500" : value < 15 ? "bg-amber-500" : "bg-red-500"}
                />
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <h3 className="text-lg font-medium">Recurrence Risk Over Time</h3>
          <InfoCircle
            className="ml-2"
            content="This chart shows the estimated risk of breast cancer recurrence at different time points after diagnosis."
          />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: "Risk (%)", angle: -90, position: "insideLeft" }} />
              <Tooltip formatter={(value) => [`${value}%`, "Recurrence Risk"]} />
              <Bar dataKey="risk" name="Recurrence Risk" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Interpretation</h3>
        <p className="text-sm text-muted-foreground mb-4">
          These results represent the estimated risk of breast cancer recurrence based on the provided patient and tumor
          characteristics.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-background rounded-lg border">
            <div className="font-medium text-green-500 dark:text-green-400 mb-1">Low Risk (&lt;5%)</div>
            <p>Indicates a relatively low probability of cancer recurrence within the specified time period.</p>
          </div>
          <div className="p-3 bg-background rounded-lg border">
            <div className="font-medium text-amber-500 dark:text-amber-400 mb-1">Moderate Risk (5-15%)</div>
            <p>
              Indicates a moderate probability of cancer recurrence that may warrant additional monitoring or treatment.
            </p>
          </div>
          <div className="p-3 bg-background rounded-lg border">
            <div className="font-medium text-red-500 dark:text-red-400 mb-1">High Risk (&gt;15%)</div>
            <p>
              Indicates a higher probability of cancer recurrence that may require more aggressive treatment or
              monitoring.
            </p>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p className="font-medium">Important Note:</p>
        <p>
          These predictions are estimates based on population data and should be interpreted by healthcare professionals
          in the context of the individual patient's overall clinical picture. Treatment decisions should not be based
          solely on these results.
        </p>
      </div>
    </div>
  )
}
