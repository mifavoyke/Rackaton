"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { InfoCircle } from "@/components/info-circle"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  age_at_diagnosis: z.coerce.number().int().min(18).max(100),
  tumor_size: z.coerce.number().min(0.1).max(150),
  N_stage: z.string(),
  M_stage: z.string(),
  clinical_stage: z.string(),
  tumor_grade: z.coerce.number().int().min(1).max(3),
  ER_status: z.string(),
  PR_status: z.string(),
  HER2_status: z.string(),
  histology_type: z.string(),
  surgery_type: z.string(),
  chemo: z.string(),
  radio: z.string(),
  hormone_therapy: z.string(),
  BMI: z.coerce.number().min(10).max(50),
  alcohol_smoking: z.string(),
  family_history: z.string(),
  ki67: z.coerce.number().min(0).max(100),
  menopausal_status: z.string(),
})

interface PredictionFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void
  isLoading: boolean
}

export function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age_at_diagnosis: 55,
      tumor_size: 2.5,
      N_stage: "N0",
      M_stage: "M0",
      clinical_stage: "Stage I",
      tumor_grade: 2,
      ER_status: "Positive",
      PR_status: "Positive",
      HER2_status: "Negative",
      histology_type: "Invasive ductal",
      surgery_type: "Lumpectomy",
      chemo: "Yes",
      radio: "Yes",
      hormone_therapy: "Yes",
      BMI: 24.5,
      alcohol_smoking: "Non-smoker",
      family_history: "No",
      ki67: 15,
      menopausal_status: "Postmenopausal",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Demographics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Patient Demographics</h3>
            <Separator />

            <FormField
              control={form.control}
              name="age_at_diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Age at Diagnosis <InfoCircle content="Patient's age when breast cancer was diagnosed." />
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Age must be between 18 and 100 years.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="BMI"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    BMI <InfoCircle content="Body Mass Index (weight in kg / height in m²)" />
                  </FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="menopausal_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Menopausal Status <InfoCircle content="Patient's menopausal status at diagnosis." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select menopausal status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Premenopausal">Premenopausal</SelectItem>
                      <SelectItem value="Perimenopausal">Perimenopausal</SelectItem>
                      <SelectItem value="Postmenopausal">Postmenopausal</SelectItem>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alcohol_smoking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Alcohol/Smoking Status <InfoCircle content="Patient's alcohol consumption and smoking habits." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Non-smoker">Non-smoker</SelectItem>
                      <SelectItem value="Former smoker">Former smoker</SelectItem>
                      <SelectItem value="Current smoker">Current smoker</SelectItem>
                      <SelectItem value="Heavy drinker">Heavy drinker</SelectItem>
                      <SelectItem value="Smoker and drinker">Smoker and drinker</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="family_history"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Family History <InfoCircle content="History of breast cancer in first-degree relatives." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Tumor Characteristics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tumor Characteristics</h3>
            <Separator />

            <FormField
              control={form.control}
              name="tumor_size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tumor Size (mm) <InfoCircle content="Size of the primary tumor in millimeters." />
                  </FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tumor_grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tumor Grade <InfoCircle content="Histological grade of the tumor (1-3)." />
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Grade 1</SelectItem>
                      <SelectItem value="2">Grade 2</SelectItem>
                      <SelectItem value="3">Grade 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="histology_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Histology Type <InfoCircle content="Histological classification of the tumor." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Invasive ductal">Invasive ductal</SelectItem>
                      <SelectItem value="Invasive lobular">Invasive lobular</SelectItem>
                      <SelectItem value="Mixed ductal and lobular">Mixed ductal and lobular</SelectItem>
                      <SelectItem value="Medullary">Medullary</SelectItem>
                      <SelectItem value="Mucinous">Mucinous</SelectItem>
                      <SelectItem value="Tubular">Tubular</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ki67"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ki-67 (%) <InfoCircle content="Proliferation marker, percentage of positive cells." />
                  </FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormDescription>Value between 0 and 100%.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Staging */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Staging</h3>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="N_stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    N Stage <InfoCircle content="Lymph node involvement status." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select N stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="N0">N0</SelectItem>
                      <SelectItem value="N1">N1</SelectItem>
                      <SelectItem value="N2">N2</SelectItem>
                      <SelectItem value="N3">N3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="M_stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    M Stage <InfoCircle content="Distant metastasis status." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select M stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="M0">M0</SelectItem>
                      <SelectItem value="M1">M1</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clinical_stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Clinical Stage <InfoCircle content="Overall cancer stage at diagnosis." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select clinical stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Stage 0">Stage 0</SelectItem>
                      <SelectItem value="Stage I">Stage I</SelectItem>
                      <SelectItem value="Stage II">Stage II</SelectItem>
                      <SelectItem value="Stage III">Stage III</SelectItem>
                      <SelectItem value="Stage IV">Stage IV</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Receptor Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Receptor Status</h3>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="ER_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ER Status <InfoCircle content="Estrogen receptor status of the tumor." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ER status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Positive">Positive</SelectItem>
                      <SelectItem value="Negative">Negative</SelectItem>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="PR_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    PR Status <InfoCircle content="Progesterone receptor status of the tumor." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select PR status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Positive">Positive</SelectItem>
                      <SelectItem value="Negative">Negative</SelectItem>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="HER2_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    HER2 Status <InfoCircle content="Human epidermal growth factor receptor 2 status." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select HER2 status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Positive">Positive</SelectItem>
                      <SelectItem value="Negative">Negative</SelectItem>
                      <SelectItem value="Equivocal">Equivocal</SelectItem>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Treatment */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Treatment</h3>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="surgery_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Surgery Type <InfoCircle content="Type of surgical procedure performed." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select surgery type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Lumpectomy">Lumpectomy</SelectItem>
                      <SelectItem value="Mastectomy">Mastectomy</SelectItem>
                      <SelectItem value="Bilateral mastectomy">Bilateral mastectomy</SelectItem>
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chemo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Chemotherapy <InfoCircle content="Whether patient received chemotherapy." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="radio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Radiotherapy <InfoCircle content="Whether patient received radiotherapy." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hormone_therapy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Hormone Therapy <InfoCircle content="Whether patient received hormone therapy." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              "Calculate Recurrence Risk"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
