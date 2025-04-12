# from src.setup import *
# from src.load_data import load_and_preprocess
# from src.eda import run_eda
# from src.train_model import train_cox_model
# from src.predict import predict_risks
# from src.visualise import plot_patient_curve
# from src.export_model import save_model

# # 1. Load data
# # 2. Run EDA
# # 3. Train model
# # 4. Predict recurrence for one patient
# # 5. Visualize patient curve
# # 6. Save model

import pandas as pd
from lifelines import CoxPHFitter
from sklearn.model_selection import train_test_split
from lifelines.utils import concordance_index

df = pd.read_csv("synthetic_data.csv")
df_full = df.dropna()
categorical_cols = ['tumor_size', 'N_stage', 'M_stage', 'clinical_stage', 'histology_type', 'surgery_type']
df_full = pd.get_dummies(df_full, columns=categorical_cols, drop_first=True)
low_variance_cols = [col for col in df_full.columns if df_full[col].nunique() == 1]
print("Dropping low-variance cols:", low_variance_cols)
df_full.drop(columns=low_variance_cols, inplace=True)
train_full, test_full = train_test_split(df_full, test_size=0.2, random_state=42)
print("\nCox Model with All Features:")
cph_full = CoxPHFitter(penalizer=0.1)
cph_full.fit(train_full, duration_col='time_to_event', event_col='event')
cph_full.print_summary()
c_index = cph_full.concordance_index_
print(f"Train C-index: {c_index:.3f}")
predicted_partial_hazards = cph_full.predict_partial_hazard(test_full) # Predict on test set
c_index_test = concordance_index(test_full['time_to_event'], -predicted_partial_hazards, test_full['event']) # Calculate test C-index
print(f"Test C-index: {c_index_test:.3f}")
cph_full.save('../backend/model/cox_model.pkl')

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