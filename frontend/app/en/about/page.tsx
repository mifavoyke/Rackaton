import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          About the Prediction Tool
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Purpose</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
            This web tool provides personalized risk estimates of breast cancer recurrence for patients in the Czech Republic. It is designed to support shared decision-making between clinicians and patients by offering a data-driven perspective on prognosis over 1 to 10 years. Inspired by the UK's Predict Breast tool, our goal is to create a localized version tailored to the Czech medical context and available data.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Methodology</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
            Our predictions are powered by the Cox Proportional Hazards model, a widely-used method in survival analysis. We trained the model using real-world data from the Czech National Cancer Registry (NOR) and the National Registry of Reimbursed Health Services (NRHZS).
            We selected key clinical indicators known to affect breast cancer prognosis, including:
            <p></p>
            <b><p>
              Tumor size and staging (TNM classification)</p>
            <p>Histological grading</p>
            <p>Type of treatment received (chemotherapy, radiotherapy, targeted therapy)</p>
            <p>Patient demographics (age at diagnosis, lateralization)</p>
            </b>
            The model learns from tens of thousands of anonymized patient records how combinations of these features relate to time-to-recurrence. Once trained, it estimates an individualized survival function, i.e., the likelihood of remaining recurrence-free for each year after diagnosis.

            When treatment information is missing, we assume the patient is healthy and untreated by default. For patients who did not experience recurrence, we estimate the follow-up time as the period between diagnosis and today. These assumptions allow us to include censored data — essential for the Cox model — and reduce data loss due to missing values.
            </p>
            <p className="mt-4">
              The model has been validated using datasets gatheres by Ústav zdravotnických informací a statistiky České republiky (ÚZIS).
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
              <li>
                Predictions are based on population-level data and may not account for all individual variations
              </li>
              <li>
                The tool should be used as a supplement to, not a replacement for, clinical judgment
              </li>
              <li>
                Accuracy may vary depending on the completeness and accuracy of input data
              </li>
              <li>
                The model may not account for all potential prognostic factors
              </li>
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
              <li>
              Ústav zdravotnických informací a statistiky ČR (ÚZIS)
              </li>
              <li>
              Czech National Cancer Registry (NOR)
              </li>
              <li>
                PREDICT: a new UK prognostic model that predicts recidivism following surgery for invasive breast cancer
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}