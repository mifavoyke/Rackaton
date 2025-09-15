"use client"
import React, { useState } from "react"

const initialState = {
  vekova_kategorie_10let_dg: "",
  lateralita_kod: "",
  grading: "",
  stadium_2: "0",
  stadium_3: "0",
  stadium_4: "0",
  stadium_X: "0",
  stadium_Y: "0",
  je_nl_chemo: "0",
  je_nl_target: "0",
  je_nl_radio: "0",
  tnm_klasifikace_t_kod_1: "0",
  tnm_klasifikace_t_kod_1a: "0",
  tnm_klasifikace_t_kod_1b: "0",
  tnm_klasifikace_t_kod_1c: "0",
  tnm_klasifikace_t_kod_1m: "0",
  tnm_klasifikace_t_kod_2: "0",
  tnm_klasifikace_t_kod_2a: "0",
  tnm_klasifikace_t_kod_2b: "0",
  tnm_klasifikace_t_kod_2c: "0",
  tnm_klasifikace_t_kod_3: "0",
  tnm_klasifikace_t_kod_4: "0",
  tnm_klasifikace_t_kod_4a: "0",
  tnm_klasifikace_t_kod_4b: "0",
  tnm_klasifikace_t_kod_4c: "0",
  tnm_klasifikace_t_kod_4d: "0",
  tnm_klasifikace_t_kod_a: "0",
  tnm_klasifikace_t_kod_is: "0",
  tnm_klasifikace_t_kod_isD: "0",
  tnm_klasifikace_t_kod_isL: "0",
  tnm_klasifikace_t_kod_isP: "0",
  tnm_klasifikace_n_kod_1: "0",
  tnm_klasifikace_n_kod_1a: "0",
  tnm_klasifikace_n_kod_1b: "0",
  tnm_klasifikace_n_kod_1c: "0",
  tnm_klasifikace_n_kod_1m: "0",
  tnm_klasifikace_n_kod_2: "0",
  tnm_klasifikace_n_kod_2a: "0",
  tnm_klasifikace_n_kod_2b: "0",
  tnm_klasifikace_n_kod_3: "0",
  tnm_klasifikace_n_kod_3a: "0",
  tnm_klasifikace_n_kod_3b: "0",
  tnm_klasifikace_n_kod_3c: "0",
  tnm_klasifikace_m_kod_1: "0",
  tnm_klasifikace_m_kod_2: "0",
  tnm_klasifikace_m_kod_3: "0",
  tnm_klasifikace_t_kod_1a2: "0",
  tnm_klasifikace_t_kod_3b: "0",
  tnm_klasifikace_t_kod_X: "0",
  tnm_klasifikace_n_kod_2c: "0",
  tnm_klasifikace_n_kod_X: "0",
  tnm_klasifikace_m_kod_1d: "0",
  tnm_klasifikace_m_kod_X: "0",
  rok_dg: ""
}

type PredictionFormProps = {
  onSubmit?: (data: Record<string, number>) => Promise<void> | void
  isLoading?: boolean
}

export function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")
    try {
      // Convert all values to numbers
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, Number(v)])
      )
      if (onSubmit) {
        await onSubmit(payload as Record<string, number>)
      } else {
        const res = await fetch("/predict/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
        if (!res.ok) throw new Error(await res.text())
        const data = await res.json()
        setResult(data)
      }
    } catch (err: any) {
      setError(err.message || "Prediction failed.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Example fields, add all required fields as needed */}
      <label>
        Age (years):
        <input
          type="number"
          name="vekova_kategorie_10let_dg"
          value={form.vekova_kategorie_10let_dg}
          onChange={handleChange}
          min={20}
          max={100}
          required
        />
      </label>
      <label>
        Lateralita kod:
        <input
          type="number"
          name="lateralita_kod"
          value={form.lateralita_kod}
          onChange={handleChange}
          min={1}
          max={4}
          required
        />
      </label>
      <label>
        Grading:
        <input
          type="number"
          name="grading"
          value={form.grading}
          onChange={handleChange}
          min={1}
          max={3}
          required
        />
      </label>
      {/* Add other fields here as needed, following the same pattern */}
      <button type="submit" disabled={isLoading || submitting}>
        {isLoading || submitting ? "Predicting..." : "Predict"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </form>
  )
}
// legacy complex form code removed
