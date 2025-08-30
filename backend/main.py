from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # Add other frontend URLs if deploying elsewhere
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Can be ["*"] for development, but not recommended for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model/cox_model.pkl")
class PatientData(BaseModel):
    vekova_kategorie_10let_dg: int
    lateralita_kod: int
    grading: int
    je_nl_chemo: int
    je_nl_target: int
    je_nl_radio: int
    tnm_klasifikace_t_kod_1: int
    tnm_klasifikace_t_kod_1a: int
    tnm_klasifikace_t_kod_1a2: int
    tnm_klasifikace_t_kod_1b: int
    tnm_klasifikace_t_kod_1c: int
    tnm_klasifikace_t_kod_1m: int
    tnm_klasifikace_t_kod_2: int
    tnm_klasifikace_t_kod_2a: int
    tnm_klasifikace_t_kod_2b: int
    tnm_klasifikace_t_kod_2c: int
    tnm_klasifikace_t_kod_3: int
    tnm_klasifikace_t_kod_3b: int
    tnm_klasifikace_t_kod_4: int
    tnm_klasifikace_t_kod_4a: int
    tnm_klasifikace_t_kod_4b: int
    tnm_klasifikace_t_kod_4c: int
    tnm_klasifikace_t_kod_4d: int
    tnm_klasifikace_t_kod_a: int
    tnm_klasifikace_t_kod_is: int
    tnm_klasifikace_t_kod_isD: int
    tnm_klasifikace_t_kod_isL: int
    tnm_klasifikace_t_kod_isP: int
    tnm_klasifikace_t_kod_X: int
    tnm_klasifikace_n_kod_1: int
    tnm_klasifikace_n_kod_1a: int
    tnm_klasifikace_n_kod_1b: int
    tnm_klasifikace_n_kod_1c: int
    tnm_klasifikace_n_kod_1m: int
    tnm_klasifikace_n_kod_2: int
    tnm_klasifikace_n_kod_2a: int
    tnm_klasifikace_n_kod_2b: int
    tnm_klasifikace_n_kod_2c: int
    tnm_klasifikace_n_kod_3: int
    tnm_klasifikace_n_kod_3a: int
    tnm_klasifikace_n_kod_3b: int
    tnm_klasifikace_n_kod_3c: int
    tnm_klasifikace_n_kod_X: int
    tnm_klasifikace_m_kod_1: int
    tnm_klasifikace_m_kod_1d: int
    tnm_klasifikace_m_kod_2: int
    tnm_klasifikace_m_kod_3: int
    tnm_klasifikace_m_kod_X: int
    stadium_2: int
    stadium_3: int
    stadium_4: int
    stadium_X: int
    stadium_Y: int
    rok_dg: int

def map_age_to_category(age: int) -> int:
    if age < 30:
        return 102
    elif age < 40:
        return 103
    elif age < 50:
        return 104
    elif age < 60:
        return 105
    elif age < 70:
        return 106
    elif age < 80:
        return 107
    elif age < 90:
        return 108
    else:
        return 109

try:
    model = joblib.load("model/cox_model.pkl")
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.post("/predict/")
def predict(data: PatientData):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded.")
    try:
        data_dict = data.model_dump()
        data_dict["vekova_kategorie_10let_dg"] = map_age_to_category(data_dict["vekova_kategorie_10let_dg"])
        print("Received input data:")
        for key, value in data_dict.items():
            print(f"  {key}: {value}")
        input_df = pd.DataFrame([data_dict])
        if not hasattr(model, 'predict_survival_function'):
            raise HTTPException(status_code=500, detail="Model does not have the predict_survival_function method.")

        years_to_predict = list(range(1, 11))
        days_to_predict = [year * 365 for year in years_to_predict]
        survival_func = model.predict_survival_function(input_df, times=days_to_predict)
        survival_probs = {f"year_{year}": float(survival_func.iloc[i, 0]) for i, year in enumerate(years_to_predict)}
        recidivism_risks = {f"year_{year}": 1 - prob for year, prob in survival_probs.items()}

        # Cox model summary
        cox_summary = model.summary.reset_index()
        selected_features = [key for key, value in data_dict.items() if value == 1]
        selected_features = []

        # Always include age and grading
        selected_features.append("vekova_kategorie_10let_dg")
        selected_features.append("grading")
        selected_features.extend([
            k for k, v in data_dict.items()
            if v == 1 and not k.startswith("stadium_") and k != "lateralita_kod"
        ])

        cox_model_data = []
        for _, row in cox_summary.iterrows():
            variable = row["covariate"]
            if variable in selected_features:
                cox_model_data.append({
                "variable": variable,
                "hazard_ratio": row["exp(coef)"],
                "p_value": row["p"]
        })
        return {
            "survival_probabilities": recidivism_risks,
            "model_input": data_dict,
            "cox_model": cox_model_data
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
