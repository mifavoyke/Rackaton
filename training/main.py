# NaN-filling strategy where missing values are replaced with the "healthy baseline values"
import pandas as pd
from lifelines import CoxPHFitter
from sklearn.model_selection import train_test_split
from lifelines.utils import concordance_index
import joblib
import datetime

selected_columns = [
    "vekova_kategorie_10let_dg",
    "rok_dg",
    "lateralita_kod",
    "grading",
    "stadium",
    "tnm_klasifikace_t_kod",
    "tnm_klasifikace_n_kod",
    "tnm_klasifikace_m_kod",
    "je_nl",
    "time_datum_dg_to_zahajeni_nl",
    "je_nl_chemo",
    "je_nl_target",
    "je_nl_radio"
]
df = pd.read_csv("/Users/yevahusieva/Documents/42/rackaton2025/training/data/dataset.csv")
df = df[selected_columns]

healthy_defaults = {
    "vekova_kategorie_10let_dg": 104,
    "lateralita_kod": 4,
    "grading": 2,
    "tnm_klasifikace_t_kod": "T1",     
    "tnm_klasifikace_n_kod": "N0",
    "tnm_klasifikace_m_kod": "M0",
    "je_nl_chemo": 0,
    "je_nl_target": 0,
    "je_nl_radio": 0
}
for col, default in healthy_defaults.items():
    df[col].fillna(default, inplace=True)

categorical_cols = [
    "tnm_klasifikace_t_kod",
    "tnm_klasifikace_n_kod",
    "tnm_klasifikace_m_kod",
    "stadium"
]
current_year = datetime.datetime.now().year
df["estimated_followup_years"] = current_year - df["rok_dg"]
df["estimated_followup_days"] = df["estimated_followup_years"] * 365
# FILL MISSING DURATIONS FOR CENSORED PATIENTS
df.loc[
    (df["je_nl"] == 0) & (df["time_datum_dg_to_zahajeni_nl"].isna()),
    "time_datum_dg_to_zahajeni_nl"
] = df.loc[
    (df["je_nl"] == 0) & (df["time_datum_dg_to_zahajeni_nl"].isna()),
    "estimated_followup_days"
]
# DROP TEMPORARY IMPUTATION COLUMNS
df.drop(columns=["estimated_followup_years", "estimated_followup_days"], inplace=True)
df_encoded = pd.get_dummies(df, columns=categorical_cols, drop_first=True)

print(df['je_nl'].value_counts(normalize=True))  # Should show something like 0: 80%, 1: 20%
print(df[df["time_datum_dg_to_zahajeni_nl"].isna()]["je_nl"].value_counts(dropna=False))
# print(df[df["time_datum_dg_to_zahajeni_nl"].isna()]["je_nl"].value_counts())

low_variance_cols = [col for col in df_encoded.columns if df_encoded[col].nunique() == 1]
print("Dropping low-variance cols:", low_variance_cols)

train_full, test_full = train_test_split(df_encoded, test_size=0.2, random_state=42)
print("\nCox Model with All Features:")
cph_full = CoxPHFitter(penalizer=0.5, l1_ratio=0.0)
cph_full.fit(train_full, duration_col='time_datum_dg_to_zahajeni_nl', event_col='je_nl')
cph_full.print_summary()
c_index = cph_full.concordance_index_
print(f"Train C-index: {c_index:.3f}")
predicted_partial_hazards = cph_full.predict_partial_hazard(test_full) # Predict on test set
c_index_test = concordance_index(test_full['time_datum_dg_to_zahajeni_nl'], -predicted_partial_hazards, test_full['je_nl']) # Calculate test C-index
print(f"Test C-index: {c_index_test:.3f}")
joblib.dump(cph_full, 'cox_model.pkl')

# 🧬 1. Demographic & Identification Data
# English	                                    Czech
# Patient ID (anonymized)	                    ID pacienta (anonymizované)
# Sex	                                        Pohlaví
# Year of birth	                                Rok narození
# Region of treatment	                        Kraj léčby
# 🧪 2. Clinical Variables
# English	                                    Czech
# Date of diagnosis	                            Datum stanovení diagnózy
# Diagnosis code (ICD-10)	                    Diagnóza (kód MKN-10)
# Histological type / morphology	            Morfologie nádoru
# Tumor grade (I–III)	                        Grading nádoru
# Tumor size (T)	                            TNM: T
# Lymph node involvement (N)	                TNM: N
# Distant metastases (M)	                    TNM: M
# Laterality (left, right, bilateral)	        Lateralita
# 💊 3. Treatment Variables
# English	                                    Czech
# Surgery (yes/no)	                            Chirurgický zákrok
# Radiotherapy (yes/no)	                        Radioterapie
# Chemotherapy (yes/no)	                        Chemoterapie
# Hormonal therapy (yes/no)	                    Hormonální terapie
# Biological therapy	                        Biologická léčba
# 🕒 4. Survival & Recurrence Outcome
# English	                                    Czech
# Date of recurrence (if occurred)	            Datum recidivy
# Date of last contact or death	                Datum posledního kontaktu / úmrtí
# Event type (recurrence, death, alive)	        Typ události (recidiva, úmrtí, živý)
# Censoring indicator (0 = censored, 1 = event) Indikátor cenzoringu (0 = cenzorováno, 1 = událost)

# Dummy variables are numerical representations of categorical variables