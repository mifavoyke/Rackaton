# Re-import libraries after kernel reset
import pandas as pd
import numpy as np

# Set random seed and number of rows
np.random.seed(42)
n = 5000

# Generate base data
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
# may add the presence flag of BRCA1 or BRCA2 genes

# Baseline hazard model
stage_map = {'I': 1, 'II': 2, 'III': 3, 'IV': 4}
clinical_stage_numeric = np.array([stage_map[stage] for stage in clinical_stage])
baseline_hazard = clinical_stage_numeric * tumor_grade
time_to_event = np.random.exponential(scale=60 / baseline_hazard)
time_to_event = np.clip(time_to_event, 1, 120)
event = np.random.choice([0, 1], size=n, p=[0.7, 0.3])

# Extended features
# 1. Age of menopause and had_menopause flag
age_of_menopause = []
for age in age_at_diagnosis:
    if age >= 55:
        menopausal_age = np.random.randint(45, 56)
        age_of_menopause.append(menopausal_age)
    elif age <= 45:
        age_of_menopause.append(0) # can still be very low probability - add
    else:
        if np.random.rand() < 0.2:
            menopausal_age = np.random.randint(45, age + 1)
            age_of_menopause.append(menopausal_age)
        else:
            age_of_menopause.append(0)
# 2. Alcohol and smoking score
alcohol = np.random.choice([0, 1], size=n, p=[0.6, 0.4])
smoking = np.random.choice([0, 1], size=n, p=[0.7, 0.3])
alcohol_smoking_score = alcohol + smoking
# 3. Family history score
family_history_score = np.random.choice([0, 1, 2], size=n, p=[0.6, 0.3, 0.1])
# 4. Ki67 score
ki67_score = np.random.beta(a=2, b=5, size=n) * 100
ki67_score = np.round(ki67_score, 1)
# 5. BMI
BMI = np.clip(np.random.normal(loc=26, scale=5, size=n), 16, 45)

# Compile into DataFrame
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
    'time_to_event': np.round(time_to_event, 1),
    'event': event,
    'BMI': BMI.round(1),
    'family_history_score': family_history_score,
    'alcohol_smoking_score': alcohol_smoking_score,
    'ki67_score': ki67_score,
    'age_of_menopause': age_of_menopause
})

print(df.head())
df.to_csv("synthetic_data.csv", index=False)