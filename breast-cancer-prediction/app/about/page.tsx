import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About the Prediction Tool</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Purpose</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This breast cancer recurrence prediction tool is designed to help healthcare providers estimate the risk
              of cancer recurrence based on patient and tumor characteristics. It provides predictions for recurrence
              risk at 12, 36, and 60 months after diagnosis.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Methodology</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The prediction model is based on clinical data from patients diagnosed with breast cancer. It takes into
              account various factors including age, tumor characteristics, receptor status, treatment modalities, and
              lifestyle factors to generate personalized risk estimates.
            </p>
            <p className="mt-4">
              The model has been validated using independent datasets to ensure accuracy and reliability.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Limitations</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              While this tool provides valuable information for clinical decision-making, it has several limitations:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Predictions are based on population-level data and may not account for all individual variations</li>
              <li>The tool should be used as a supplement to, not a replacement for, clinical judgment</li>
              <li>Accuracy may vary depending on the completeness and accuracy of input data</li>
              <li>The model may not account for all potential prognostic factors</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>References</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This tool was developed based on research and methodologies from the following sources:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Cambridge Breast Unit, Cambridge University Hospitals NHS Foundation Trust</li>
              <li>Department of Oncology, University of Cambridge</li>
              <li>
                PREDICT: a new UK prognostic model that predicts survival following surgery for invasive breast cancer
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
