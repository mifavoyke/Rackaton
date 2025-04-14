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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"

const formSchema = z.object({
  vekova_kategorie_10let_dg: z.coerce.number().int().min(20).max(100),
  lateralita_kod: z.coerce.number().int().min(1).max(4),
  grading: z.coerce.number().int().min(1).max(3),
  stadium_2: z.coerce.number().int().min(0).max(1),
  stadium_3: z.coerce.number().int().min(0).max(1),
  stadium_4: z.coerce.number().int().min(0).max(1),
  stadium_X: z.coerce.number().int().min(0).max(1),
  stadium_Y: z.coerce.number().int().min(0).max(1),
  je_nl_chemo: z.coerce.number().int().min(0).max(1),
  je_nl_target: z.coerce.number().int().min(0).max(1),
  je_nl_radio: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_1: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_1a: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_1b: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_1c: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_1m: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_2: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_2a: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_2b: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_2c: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_3: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_4: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_4a: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_4b: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_4c: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_4d: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_a: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_is: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_isD: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_isL: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_isP: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_1: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_1a: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_1b: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_1c: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_1m: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_2: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_2a: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_2b: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_3: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_3a: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_3b: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_3c: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_m_kod_1: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_m_kod_2: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_m_kod_3: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_1a2: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_3b: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_t_kod_X: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_2c: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_n_kod_X: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_m_kod_1d: z.coerce.number().int().min(0).max(1),
  tnm_klasifikace_m_kod_X: z.coerce.number().int().min(0).max(1),
  rok_dg: z.coerce.number().int().min(1900).max(new Date().getFullYear()),
})

interface PredictionFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void
  isLoading: boolean
  lang: string
}

export function PredictionForm({ onSubmit, isLoading, lang }: PredictionFormProps) {
  const isEnglish = lang === "en"
  const currentYear = new Date().getFullYear()

  // State for radio button selections
  const [selectedTClassification, setSelectedTClassification] = useState<string>("tnm_klasifikace_t_kod_1")
  const [selectedNClassification, setSelectedNClassification] = useState<string | null>(null)
  const [selectedMClassification, setSelectedMClassification] = useState<string | null>(null)
  const [selectedStage, setSelectedStage] = useState<string>("stage_1")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vekova_kategorie_10let_dg: 50,
      lateralita_kod: 1,
      grading: 2,
      stadium_2: 0,
      stadium_3: 0,
      stadium_4: 0,
      stadium_X: 0,
      stadium_Y: 0,
      je_nl_chemo: 0,
      je_nl_target: 0,
      je_nl_radio: 1,
      tnm_klasifikace_t_kod_1: 1,
      tnm_klasifikace_t_kod_1a: 0,
      tnm_klasifikace_t_kod_1b: 0,
      tnm_klasifikace_t_kod_1c: 0,
      tnm_klasifikace_t_kod_1m: 0,
      tnm_klasifikace_t_kod_2: 0,
      tnm_klasifikace_t_kod_2a: 0,
      tnm_klasifikace_t_kod_2b: 0,
      tnm_klasifikace_t_kod_2c: 0,
      tnm_klasifikace_t_kod_3: 0,
      tnm_klasifikace_t_kod_4: 0,
      tnm_klasifikace_t_kod_4a: 0,
      tnm_klasifikace_t_kod_4b: 0,
      tnm_klasifikace_t_kod_4c: 0,
      tnm_klasifikace_t_kod_4d: 0,
      tnm_klasifikace_t_kod_a: 0,
      tnm_klasifikace_t_kod_is: 0,
      tnm_klasifikace_t_kod_isD: 0,
      tnm_klasifikace_t_kod_isL: 0,
      tnm_klasifikace_t_kod_isP: 0,
      tnm_klasifikace_n_kod_1: 0,
      tnm_klasifikace_n_kod_1a: 0,
      tnm_klasifikace_n_kod_1b: 0,
      tnm_klasifikace_n_kod_1c: 0,
      tnm_klasifikace_n_kod_1m: 0,
      tnm_klasifikace_n_kod_2: 0,
      tnm_klasifikace_n_kod_2a: 0,
      tnm_klasifikace_n_kod_2b: 0,
      tnm_klasifikace_n_kod_3: 0,
      tnm_klasifikace_n_kod_3a: 0,
      tnm_klasifikace_n_kod_3b: 0,
      tnm_klasifikace_n_kod_3c: 0,
      tnm_klasifikace_m_kod_1: 0,
      tnm_klasifikace_m_kod_2: 0,
      tnm_klasifikace_m_kod_3: 0,
      tnm_klasifikace_t_kod_1a2: 0,
      tnm_klasifikace_t_kod_3b: 0,
      tnm_klasifikace_t_kod_X: 0,
      tnm_klasifikace_n_kod_2c: 0,
      tnm_klasifikace_n_kod_X: 0,
      tnm_klasifikace_m_kod_1d: 0,
      tnm_klasifikace_m_kod_X: 0,
      rok_dg: currentYear - 1,
    },
  })

  const handleTNMTSelection = (value: string) => {
    // Reset all T values
    const tFields = [
      "tnm_klasifikace_t_kod_1",
      "tnm_klasifikace_t_kod_1a",
      "tnm_klasifikace_t_kod_1b",
      "tnm_klasifikace_t_kod_1c",
      "tnm_klasifikace_t_kod_1m",
      "tnm_klasifikace_t_kod_2",
      "tnm_klasifikace_t_kod_2a",
      "tnm_klasifikace_t_kod_2b",
      "tnm_klasifikace_t_kod_2c",
      "tnm_klasifikace_t_kod_3",
      "tnm_klasifikace_t_kod_4",
      "tnm_klasifikace_t_kod_4a",
      "tnm_klasifikace_t_kod_4b",
      "tnm_klasifikace_t_kod_4c",
      "tnm_klasifikace_t_kod_4d",
      "tnm_klasifikace_t_kod_a",
      "tnm_klasifikace_t_kod_is",
      "tnm_klasifikace_t_kod_isD",
      "tnm_klasifikace_t_kod_isL",
      "tnm_klasifikace_t_kod_isP",
    ]

    tFields.forEach((field) => {
      form.setValue(field as any, 0)
    })

    // Set the selected value
    form.setValue(value as any, 1)
    setSelectedTClassification(value)
  }

  const handleTNMNSelection = (value: string | null) => {
    // Reset all N values
    const nFields = [
      "tnm_klasifikace_n_kod_1",
      "tnm_klasifikace_n_kod_1a",
      "tnm_klasifikace_n_kod_1b",
      "tnm_klasifikace_n_kod_1c",
      "tnm_klasifikace_n_kod_1m",
      "tnm_klasifikace_n_kod_2",
      "tnm_klasifikace_n_kod_2a",
      "tnm_klasifikace_n_kod_2b",
      "tnm_klasifikace_n_kod_3",
      "tnm_klasifikace_n_kod_3a",
      "tnm_klasifikace_n_kod_3b",
      "tnm_klasifikace_n_kod_3c",
    ]

    nFields.forEach((field) => {
      form.setValue(field as any, 0)
    })

    // Set the selected value if not null
    if (value) {
      form.setValue(value as any, 1)
    }
    setSelectedNClassification(value)
  }

  const handleTNMMSelection = (value: string | null) => {
    // Reset all M values
    const mFields = ["tnm_klasifikace_m_kod_1", "tnm_klasifikace_m_kod_2", "tnm_klasifikace_m_kod_3"]

    mFields.forEach((field) => {
      form.setValue(field as any, 0)
    })

    // Set the selected value if not null
    if (value) {
      form.setValue(value as any, 1)
    }
    setSelectedMClassification(value)
  }

  const handleStageSelection = (value: string) => {
    // Reset all stage values
    form.setValue("stadium_2", 0)
    form.setValue("stadium_3", 0)
    form.setValue("stadium_4", 0)
    form.setValue("stadium_X", 0)
    form.setValue("stadium_Y", 0)

    // Set the selected stage value
    if (value === "stage_2") {
      form.setValue("stadium_2", 1)
    } else if (value === "stage_3") {
      form.setValue("stadium_3", 1)
    }

    setSelectedStage(value)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Demographics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {isEnglish ? "Patient Demographics" : "Demografické údaje pacienta"}
            </h3>
            <Separator />

            <FormField
              control={form.control}
              name="vekova_kategorie_10let_dg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEnglish ? "Age at Diagnosis" : "Věk při diagnóze"}{" "}
                    <InfoCircle
                      content={
                        isEnglish
                          ? "Patient's age when breast cancer was diagnosed."
                          : "Věk pacienta při diagnóze rakoviny prsu."
                      }
                    />
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    {isEnglish ? "Age must be between 20 and 100 years." : "Věk musí být mezi 20 a 100 lety."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rok_dg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEnglish ? "Year of Diagnosis" : "Rok diagnózy"}{" "}
                    <InfoCircle
                      content={
                        isEnglish
                          ? "The year when breast cancer was diagnosed."
                          : "Rok, kdy byla diagnostikována rakovina prsu."
                      }
                    />
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    {isEnglish
                      ? `Year must be between 1900 and ${currentYear}.`
                      : `Rok musí být mezi 1900 a ${currentYear}.`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lateralita_kod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEnglish ? "Laterality" : "Lateralita"}{" "}
                    <InfoCircle
                      content={
                        isEnglish
                          ? "The side of the body where the tumor is located."
                          : "Strana těla, kde se nachází nádor."
                      }
                    />
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isEnglish ? "Select laterality" : "Vyberte lateralitu"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">{isEnglish ? "Right" : "Pravá"}</SelectItem>
                      <SelectItem value="2">{isEnglish ? "Left" : "Levá"}</SelectItem>
                      <SelectItem value="3">{isEnglish ? "Both" : "Obě"}</SelectItem>
                      <SelectItem value="4">{isEnglish ? "Not applicable" : "Neaplikovatelné"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Tumor Characteristics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{isEnglish ? "Tumor Characteristics" : "Charakteristiky nádoru"}</h3>
            <Separator />

            <FormField
              control={form.control}
              name="grading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEnglish ? "Tumor Grade" : "Stupeň nádoru"}{" "}
                    <InfoCircle
                      content={
                        isEnglish ? "Histological grade of the tumor (1-3)." : "Histologický stupeň nádoru (1-3)."
                      }
                    />
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isEnglish ? "Select grade" : "Vyberte stupeň"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">{isEnglish ? "Grade 1" : "Stupeň 1"}</SelectItem>
                      <SelectItem value="2">{isEnglish ? "Grade 2" : "Stupeň 2"}</SelectItem>
                      <SelectItem value="3">{isEnglish ? "Grade 3" : "Stupeň 3"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stage as radio buttons - only show 1, 2, 3 */}
            <div className="space-y-2">
              <FormLabel>
                {isEnglish ? "Stage" : "Stadium"}{" "}
                <InfoCircle
                  content={isEnglish ? "Clinical stage of the cancer (1-3)." : "Klinické stadium rakoviny (1-3)."}
                />
              </FormLabel>
              <div className="space-y-2 mt-2">
                <label className="text-sm font-medium flex items-center space-x-2">
                  <input
                    type="radio"
                    name="stage-selection"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    onChange={() => handleStageSelection("stage_1")}
                    checked={selectedStage === "stage_1"}
                  />
                  <span>{isEnglish ? "Stage 1" : "Stadium 1"}</span>
                </label>

                <label className="text-sm font-medium flex items-center space-x-2">
                  <input
                    type="radio"
                    name="stage-selection"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    onChange={() => handleStageSelection("stage_2")}
                    checked={selectedStage === "stage_2"}
                  />
                  <span>{isEnglish ? "Stage 2" : "Stadium 2"}</span>
                </label>

                <label className="text-sm font-medium flex items-center space-x-2">
                  <input
                    type="radio"
                    name="stage-selection"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    onChange={() => handleStageSelection("stage_3")}
                    checked={selectedStage === "stage_3"}
                  />
                  <span>{isEnglish ? "Stage 3" : "Stadium 3"}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{isEnglish ? "Treatment" : "Léčba"}</h3>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="je_nl_chemo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEnglish ? "Chemotherapy" : "Chemoterapie"}{" "}
                    <InfoCircle
                      content={
                        isEnglish ? "Whether patient received chemotherapy." : "Zda pacient podstoupil chemoterapii."
                      }
                    />
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isEnglish ? "Select option" : "Vyberte možnost"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">{isEnglish ? "Yes" : "Ano"}</SelectItem>
                      <SelectItem value="0">{isEnglish ? "No" : "Ne"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="je_nl_target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEnglish ? "Targeted Therapy" : "Cílená terapie"}{" "}
                    <InfoCircle
                      content={
                        isEnglish
                          ? "Whether patient received targeted therapy."
                          : "Zda pacient podstoupil cílenou terapii."
                      }
                    />
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isEnglish ? "Select option" : "Vyberte možnost"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">{isEnglish ? "Yes" : "Ano"}</SelectItem>
                      <SelectItem value="0">{isEnglish ? "No" : "Ne"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="je_nl_radio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEnglish ? "Radiotherapy" : "Radioterapie"}{" "}
                    <InfoCircle
                      content={
                        isEnglish ? "Whether patient received radiotherapy." : "Zda pacient podstoupil radioterapii."
                      }
                    />
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isEnglish ? "Select option" : "Vyberte možnost"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">{isEnglish ? "Yes" : "Ano"}</SelectItem>
                      <SelectItem value="0">{isEnglish ? "No" : "Ne"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* TNM Classification */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{isEnglish ? "TNM Classification" : "TNM Klasifikace"}</h3>
          <Separator />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="t-classification">
              <AccordionTrigger>{isEnglish ? "T - Primary Tumor" : "T - Primární nádor"}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {isEnglish
                      ? "Select the appropriate T classification for the primary tumor."
                      : "Vyberte příslušnou T klasifikaci pro primární nádor."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="t-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMTSelection("tnm_klasifikace_t_kod_1")}
                          checked={selectedTClassification === "tnm_klasifikace_t_kod_1"}
                        />
                        <span>T1 - {isEnglish ? "Tumor ≤ 2 cm" : "Nádor ≤ 2 cm"}</span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="t-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMTSelection("tnm_klasifikace_t_kod_1a")}
                          checked={selectedTClassification === "tnm_klasifikace_t_kod_1a"}
                        />
                        <span>T1a - {isEnglish ? "Tumor > 0.1 cm but ≤ 0.5 cm" : "Nádor > 0,1 cm ale ≤ 0,5 cm"}</span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="t-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMTSelection("tnm_klasifikace_t_kod_1b")}
                          checked={selectedTClassification === "tnm_klasifikace_t_kod_1b"}
                        />
                        <span>T1b - {isEnglish ? "Tumor > 0.5 cm but ≤ 1 cm" : "Nádor > 0,5 cm ale ≤ 1 cm"}</span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="t-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMTSelection("tnm_klasifikace_t_kod_1c")}
                          checked={selectedTClassification === "tnm_klasifikace_t_kod_1c"}
                        />
                        <span>T1c - {isEnglish ? "Tumor > 1 cm but ≤ 2 cm" : "Nádor > 1 cm ale ≤ 2 cm"}</span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="t-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMTSelection("tnm_klasifikace_t_kod_2")}
                          checked={selectedTClassification === "tnm_klasifikace_t_kod_2"}
                        />
                        <span>T2 - {isEnglish ? "Tumor > 2 cm but ≤ 5 cm" : "Nádor > 2 cm ale ≤ 5 cm"}</span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="t-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMTSelection("tnm_klasifikace_t_kod_3")}
                          checked={selectedTClassification === "tnm_klasifikace_t_kod_3"}
                        />
                        <span>T3 - {isEnglish ? "Tumor > 5 cm" : "Nádor > 5 cm"}</span>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="t-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMTSelection("tnm_klasifikace_t_kod_4")}
                          checked={selectedTClassification === "tnm_klasifikace_t_kod_4"}
                        />
                        <span>
                          T4 -{" "}
                          {isEnglish
                            ? "Tumor of any size with extension to chest wall and/or skin"
                            : "Nádor jakékoliv velikosti s rozšířením do hrudní stěny a/nebo kůže"}
                        </span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="t-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMTSelection("tnm_klasifikace_t_kod_4a")}
                          checked={selectedTClassification === "tnm_klasifikace_t_kod_4a"}
                        />
                        <span>T4a - {isEnglish ? "Extension to chest wall" : "Rozšíření do hrudní stěny"}</span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="t-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMTSelection("tnm_klasifikace_t_kod_4b")}
                          checked={selectedTClassification === "tnm_klasifikace_t_kod_4b"}
                        />
                        <span>T4b - {isEnglish ? "Edema or ulceration of the skin" : "Edém nebo ulcerace kůže"}</span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="t-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMTSelection("tnm_klasifikace_t_kod_4c")}
                          checked={selectedTClassification === "tnm_klasifikace_t_kod_4c"}
                        />
                        <span>T4c - {isEnglish ? "Both 4a and 4b" : "Obojí 4a a 4b"}</span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="t-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMTSelection("tnm_klasifikace_t_kod_4d")}
                          checked={selectedTClassification === "tnm_klasifikace_t_kod_4d"}
                        />
                        <span>T4d - {isEnglish ? "Inflammatory carcinoma" : "Inflamatorní karcinom"}</span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="t-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMTSelection("tnm_klasifikace_t_kod_is")}
                          checked={selectedTClassification === "tnm_klasifikace_t_kod_is"}
                        />
                        <span>Tis - {isEnglish ? "Carcinoma in situ" : "Karcinom in situ"}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="n-classification">
              <AccordionTrigger>
                {isEnglish ? "N - Regional Lymph Nodes" : "N - Regionální lymfatické uzliny"}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {isEnglish
                      ? "Select the appropriate N classification for regional lymph nodes."
                      : "Vyberte příslušnou N klasifikaci pro regionální lymfatické uzliny."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="n-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMNSelection("tnm_klasifikace_n_kod_1")}
                          checked={selectedNClassification === "tnm_klasifikace_n_kod_1"}
                        />
                        <span>
                          N1 -{" "}
                          {isEnglish
                            ? "Metastasis in movable ipsilateral axillary lymph node(s)"
                            : "Metastázy v pohyblivých stejnostranných axilárních lymfatických uzlinách"}
                        </span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="n-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMNSelection("tnm_klasifikace_n_kod_1a")}
                          checked={selectedNClassification === "tnm_klasifikace_n_kod_1a"}
                        />
                        <span>N1a - {isEnglish ? "Micrometastasis" : "Mikrometastázy"}</span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="n-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMNSelection("tnm_klasifikace_n_kod_1b")}
                          checked={selectedNClassification === "tnm_klasifikace_n_kod_1b"}
                        />
                        <span>N1b - {isEnglish ? "Macrometastasis" : "Makrometastázy"}</span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="n-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMNSelection("tnm_klasifikace_n_kod_2")}
                          checked={selectedNClassification === "tnm_klasifikace_n_kod_2"}
                        />
                        <span>
                          N2 -{" "}
                          {isEnglish
                            ? "Metastasis in fixed ipsilateral axillary lymph node(s)"
                            : "Metastázy ve fixovaných stejnostranných axilárních lymfatických uzlinách"}
                        </span>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="n-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMNSelection("tnm_klasifikace_n_kod_2a")}
                          checked={selectedNClassification === "tnm_klasifikace_n_kod_2a"}
                        />
                        <span>
                          N2a -{" "}
                          {isEnglish
                            ? "Metastasis in axillary lymph nodes fixed to one another or to other structures"
                            : "Metastázy v axilárních lymfatických uzlinách fixovaných navzájem nebo k jiným strukturám"}
                        </span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="n-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMNSelection("tnm_klasifikace_n_kod_3")}
                          checked={selectedNClassification === "tnm_klasifikace_n_kod_3"}
                        />
                        <span>
                          N3 -{" "}
                          {isEnglish
                            ? "Metastasis in ipsilateral infraclavicular or supraclavicular lymph node(s)"
                            : "Metastázy ve stejnostranných infraklavikulárních nebo supraklavikulárních lymfatických uzlinách"}
                        </span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="n-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMNSelection("tnm_klasifikace_n_kod_3a")}
                          checked={selectedNClassification === "tnm_klasifikace_n_kod_3a"}
                        />
                        <span>
                          N3a -{" "}
                          {isEnglish
                            ? "Metastasis in infraclavicular lymph node(s)"
                            : "Metastázy v infraklavikulárních lymfatických uzlinách"}
                        </span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="n-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMNSelection("tnm_klasifikace_n_kod_3b")}
                          checked={selectedNClassification === "tnm_klasifikace_n_kod_3b"}
                        />
                        <span>
                          N3b -{" "}
                          {isEnglish
                            ? "Metastasis in internal mammary and axillary lymph nodes"
                            : "Metastázy ve vnitřních mamárních a axilárních lymfatických uzlinách"}
                        </span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="n-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMNSelection("tnm_klasifikace_n_kod_3c")}
                          checked={selectedNClassification === "tnm_klasifikace_n_kod_3c"}
                        />
                        <span>
                          N3c -{" "}
                          {isEnglish
                            ? "Metastasis in supraclavicular lymph node(s)"
                            : "Metastázy v supraklavikulárních lymfatických uzlinách"}
                        </span>
                      </label>

                      <label className="text-sm font-medium flex items-center space-x-2">
                        <input
                          type="radio"
                          name="n-classification"
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          onChange={() => handleTNMNSelection(null)}
                          checked={selectedNClassification === null}
                        />
                        <span>
                          N0 -{" "}
                          {isEnglish
                            ? "No regional lymph node metastasis"
                            : "Žádné metastázy v regionálních lymfatických uzlinách"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="m-classification">
              <AccordionTrigger>{isEnglish ? "M - Distant Metastasis" : "M - Vzdálené metastázy"}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {isEnglish
                      ? "Select the appropriate M classification for distant metastasis."
                      : "Vyberte příslušnou M klasifikaci pro vzdálené metastázy."}
                  </p>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-2">
                      <input
                        type="radio"
                        name="m-classification"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        onChange={() => handleTNMMSelection("tnm_klasifikace_m_kod_1")}
                        checked={selectedMClassification === "tnm_klasifikace_m_kod_1"}
                      />
                      <span>M1 - {isEnglish ? "Distant metastasis" : "Vzdálené metastázy"}</span>
                    </label>

                    <label className="text-sm font-medium flex items-center space-x-2">
                      <input
                        type="radio"
                        name="m-classification"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                        onChange={() => handleTNMMSelection(null)}
                        checked={selectedMClassification === null}
                      />
                      <span>M0 - {isEnglish ? "No distant metastasis" : "Žádné vzdálené metastázy"}</span>
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
                {isEnglish ? "Calculating..." : "Výpočet..."}
              </>
            ) : isEnglish ? (
              "Calculate Survival Probability"
            ) : (
              "Vypočítat pravděpodobnost recidivy"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
