# Re-import necessary libraries due to code execution environment reset
import pandas as pd
import numpy as np

# Set random seed and number of rows
np.random.seed(42)
n = 1000

# Core patient data
age_at_diagnosis = np.random.randint(30, 91, n)
tumor_size = np.random.choice(['T1', 'T2', 'T3', 'T4'], size=n, p=[0.4, 0.35, 0.2, 0.05])
N_stage = np.random.choice(['N0', 'N1', 'N2', 'N3'], size=n, p=[0.5, 0.3, 0.15, 0.05])
M_stage = np.random.choice(['M0', 'M1'], size=n, p=[0.9, 0.1])
clinical_stage = np.random.choice(['I', 'II', 'III', 'IV'], size=n, p=[0.3, 0.4, 0.25, 0.05])
tumor_grade = np.random.choice([1, 2, 3], size=n, p=[0.2, 0.5, 0.3])
ER_status = np.random.choice([0, 1], size=n, p=[0.3, 0.7])
PR_status = np.random.choice([0, 1], size=n, p=[0.4, 0.6])
HER2_status = np.random.choice([0, 1], size=n, p=[0.7, 0.3])
histology_type = np.random.choice(['ductal', 'lobular', 'other'], size=n, p=[0.7, 0.2, 0.1])
surgery_type = np.random.choice(['none', 'lumpectomy', 'mastectomy'], size=n, p=[0.05, 0.45, 0.5])
chemo = np.random.choice([0, 1], size=n, p=[0.4, 0.6])
radio = np.random.choice([0, 1], size=n, p=[0.3, 0.7])
hormone_therapy = np.random.choice([0, 1], size=n, p=[0.3, 0.7])

# Base hazard influenced by clinical stage and tumor grade
stage_map = {'I': 1, 'II': 2, 'III': 3, 'IV': 4}
clinical_stage_numeric = np.array([stage_map[stage] for stage in clinical_stage])
baseline_hazard = clinical_stage_numeric * tumor_grade
time_to_event = np.random.exponential(scale=60 / baseline_hazard)
time_to_event = np.clip(time_to_event, 1, 120)
event = np.random.choice([0, 1], size=n, p=[0.7, 0.3])

# Lifestyle and biomarker features
BMI = np.clip(np.random.normal(loc=26, scale=5, size=n), 16, 45)
alcohol_smoking = np.random.choice([0, 1], size=n, p=[0.7, 0.3])
family_history = np.random.choice([0, 1], size=n, p=[0.75, 0.25])
ki67 = np.random.choice([0, 1], size=n, p=[0.2, 0.8])
menopausal_status = np.where(age_at_diagnosis >= 50, 1, 0)

# Introduce 10% missing values as zeros
missing_mask = np.random.rand(n) < 0.1
BMI[missing_mask] = 0
alcohol_smoking[missing_mask] = 0
family_history[missing_mask] = 0
ki67[missing_mask] = 0
menopausal_status[missing_mask] = 0

# Construct DataFrame
df = pd.DataFrame({
    'age_at_diagnosis': age_at_diagnosis,
    'tumor_size': tumor_size,
    'N_stage': N_stage,
    'M_stage': M_stage,
    'clinical_stage': clinical_stage,
    'tumor_grade': tumor_grade,
    'ER_status': ER_status,
    'PR_status': PR_status,
    'HER2_status': HER2_status,
    'histology_type': histology_type,
    'surgery_type': surgery_type,
    'chemo': chemo,
    'radio': radio,
    'hormone_therapy': hormone_therapy,
    'time_to_event': time_to_event.round(1),
    'event': event,
    'BMI': BMI.round(1),
    'alcohol_smoking': alcohol_smoking,
    'family_history': family_history,
    'ki67': ki67,
    'menopausal_status': menopausal_status
})

print(df.head())
df.to_csv("synthetic_data.csv", index=False)