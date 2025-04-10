from src.setup import *
from src.load_data import load_and_preprocess
from src.eda import run_eda
from src.train_model import train_cox_model
from src.predict import predict_risks
from src.visualise import plot_patient_curve
from src.export_model import save_model

# 1. Load data
train_df, test_df = load_and_preprocess("data/synthetic_data.csv")

# 2. Run EDA
run_eda(train_df)

# 3. Train model
model = train_cox_model(train_df)

# 4. Predict recurrence for one patient
patient = test_df.iloc[0:1]
predict_risks(model, patient)

# 5. Visualize patient curve
plot_patient_curve(model, patient)

# 6. Save model
save_model(model, "cox_model.pkl")

# 🧬 1. Demographic & Identification Data
# English	Czech
# Patient ID (anonymized)	ID pacienta (anonymizované)
# Sex	Pohlaví
# Year of birth	Rok narození
# Region of treatment	Kraj léčby
# 🧪 2. Clinical Variables
# English	Czech
# Date of diagnosis	Datum stanovení diagnózy
# Diagnosis code (ICD-10)	Diagnóza (kód MKN-10)
# Histological type / morphology	Morfologie nádoru
# Tumor grade (I–III)	Grading nádoru
# Tumor size (T)	TNM: T
# Lymph node involvement (N)	TNM: N
# Distant metastases (M)	TNM: M
# Laterality (left, right, bilateral)	Lateralita
# 💊 3. Treatment Variables
# English	Czech
# Surgery (yes/no)	Chirurgický zákrok
# Radiotherapy (yes/no)	Radioterapie
# Chemotherapy (yes/no)	Chemoterapie
# Hormonal therapy (yes/no)	Hormonální terapie
# Biological therapy	Biologická léčba
# 🕒 4. Survival & Recurrence Outcome
# English	Czech
# Date of recurrence (if occurred)	Datum recidivy
# Date of last contact or death	Datum posledního kontaktu / úmrtí
# Event type (recurrence, death, alive)	Typ události (recidiva, úmrtí, živý)
# Censoring indicator (0 = censored, 1 = event)	Indikátor cenzoringu (0 = cenzorováno, 1 = událost)