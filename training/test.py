import pandas as pd
import joblib
from lifelines import CoxPHFitter

# Define the patient's data (using healthy defaults or actual input data)
patient_data = {
    "vekova_kategorie_10let_dg": 109,  # Assume 40-49 years
    "lateralita_kod": 4,               # "Odpadá"
    "grading": 2,                      # Středně diferencovaný
    "tnm_klasifikace_t_kod_1a": 0,
    "tnm_klasifikace_n_kod_1b": 0,
    "tnm_klasifikace_m_kod_1": 1,
    "je_nl": 0,
    "time_datum_dg_to_zahajeni_nl": 0,
    "je_nl_chemo": 1,  # No chemotherapy
    "je_nl_target": 0,  # No targeted therapy
    "je_nl_radio": 1,   # No radiotherapy
    "tnm_klasifikace_t_kod_1": 0,
    "tnm_klasifikace_t_kod_1b": 1,
    "tnm_klasifikace_t_kod_1c": 0,
    "tnm_klasifikace_t_kod_1m": 0,
    "tnm_klasifikace_t_kod_2": 0,
    "tnm_klasifikace_t_kod_2a": 0,
    "tnm_klasifikace_t_kod_2b": 0,
    "tnm_klasifikace_t_kod_2c": 0,
    "tnm_klasifikace_t_kod_3": 0,
    "tnm_klasifikace_t_kod_4": 0,
    "tnm_klasifikace_t_kod_4a": 0,
    "tnm_klasifikace_t_kod_4b": 0,
    "tnm_klasifikace_t_kod_4c": 0,
    "tnm_klasifikace_t_kod_4d": 0,
    "tnm_klasifikace_t_kod_a": 0,
    "tnm_klasifikace_t_kod_is": 0,
    "tnm_klasifikace_t_kod_isD": 0,
    "tnm_klasifikace_t_kod_isL": 0,
    "tnm_klasifikace_t_kod_isP": 0,
    "tnm_klasifikace_n_kod_1": 0,
    "tnm_klasifikace_n_kod_1a": 0,
    "tnm_klasifikace_n_kod_1c": 0,
    "tnm_klasifikace_n_kod_1m": 0,
    "tnm_klasifikace_n_kod_2": 0,
    "tnm_klasifikace_n_kod_2a": 0,
    "tnm_klasifikace_n_kod_2b": 0,
    "tnm_klasifikace_n_kod_3": 0,
    "tnm_klasifikace_n_kod_3a": 0,
    "tnm_klasifikace_n_kod_3b": 0,
    "tnm_klasifikace_n_kod_3c": 0,
    "tnm_klasifikace_t_kod_1a2": 0,
    "tnm_klasifikace_t_kod_3b": 0,
    "tnm_klasifikace_t_kod_X": 0,
    "tnm_klasifikace_n_kod_2c": 0,
    "tnm_klasifikace_n_kod_X": 0,
    "tnm_klasifikace_m_kod_1d": 0,
    "tnm_klasifikace_m_kod_X": 0,
    "stadium_2": 1,
    "stadium_3": 0,
    "stadium_4": 0,
    "stadium_X": 0,
    "stadium_Y": 0,
    "rok_dg": 2020
}
patient_df = pd.DataFrame([patient_data])

model = joblib.load('cox_model.pkl')

years_to_predict = list(range(1, 16))
days_to_predict = [year * 365 for year in years_to_predict]
survival_prob = model.predict_survival_function(patient_df, times=days_to_predict)
for i, year in enumerate(years_to_predict):
    prob = survival_prob.iloc[i, 0]
    print(f"Recidivism probability at {year} years: {prob:.2f}")

# curl -X POST http://127.0.0.1:8000/predict/ \
#   -H "Content-Type: application/json" \
#   -d '{
#     "vekova_kategorie_10let_dg": 50,
#     "lateralita_kod": 1,
#     "grading": 2,
#     "stadium_2": 0,
#     "stadium_3": 0,
#     "stadium_4": 0,
#     "stadium_X": 0,
#     "stadium_Y": 0,
#     "je_nl_chemo": 0,
#     "je_nl_target": 0,
#     "je_nl_radio": 1,
#         "tnm_klasifikace_t_kod_1": 0,
#     "tnm_klasifikace_t_kod_1b": 1,
#     "tnm_klasifikace_t_kod_1c": 0,
#     "tnm_klasifikace_t_kod_1m": 0,
#     "tnm_klasifikace_t_kod_2": 0,
#     "tnm_klasifikace_t_kod_2a": 0,
#     "tnm_klasifikace_t_kod_2b": 0,
#     "tnm_klasifikace_t_kod_2c": 0,
#     "tnm_klasifikace_t_kod_3": 0,
#     "tnm_klasifikace_t_kod_4": 0,
#     "tnm_klasifikace_t_kod_4a": 0,
#     "tnm_klasifikace_t_kod_4b": 0,
#     "tnm_klasifikace_t_kod_4c": 0,
#     "tnm_klasifikace_t_kod_4d": 0,
#     "tnm_klasifikace_t_kod_a": 0,
#     "tnm_klasifikace_t_kod_is": 0,
#     "tnm_klasifikace_t_kod_isD": 0,
#     "tnm_klasifikace_t_kod_isL": 0,
#     "tnm_klasifikace_t_kod_isP": 0,
#     "tnm_klasifikace_n_kod_1": 0,
#     "tnm_klasifikace_n_kod_1a": 0,
#     "tnm_klasifikace_n_kod_1c": 0,
#     "tnm_klasifikace_n_kod_1m": 0,
#     "tnm_klasifikace_n_kod_2": 0,
#     "tnm_klasifikace_n_kod_2a": 0,
#     "tnm_klasifikace_n_kod_2b": 0,
#     "tnm_klasifikace_n_kod_3": 0,
#     "tnm_klasifikace_n_kod_3a": 0,
#     "tnm_klasifikace_n_kod_3b": 0,
#     "tnm_klasifikace_n_kod_3c": 0,
#     "tnm_klasifikace_t_kod_1a2": 0,
#     "tnm_klasifikace_t_kod_3b": 0,
#     "tnm_klasifikace_t_kod_X": 0,
#     "tnm_klasifikace_n_kod_2c": 0,
#     "tnm_klasifikace_n_kod_X": 0,
#     "tnm_klasifikace_m_kod_1d": 0,
#     "tnm_klasifikace_m_kod_X": 0,
#     "stadium_2": 1,
#     "stadium_3": 0,
#     "stadium_4": 0,
#     "stadium_X": 0,
#     "stadium_Y": 0,
#     "rok_dg": 2020
# }'