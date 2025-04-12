from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib  # or use pickle
import pandas as pd

app = FastAPI()
model = joblib.load("model/cox_model.pkl")
class PatientData(BaseModel):
    age_at_diagnosis: int
    tumor_size: float
    N_stage: str
    M_stage: str
    clinical_stage: str
    tumor_grade: int
    ER_status: str
    PR_status: str
    HER2_status: str
    histology_type: str
    surgery_type: str
    chemo: str
    radio: str
    hormone_therapy: str
    BMI: float
    alcohol_smoking: str
    family_history: str
    ki67: float
    menopausal_status: str

@app.post("/predict/")
def predict(data: PatientData):
    try:
        input_df = pd.DataFrame([data.dict()])
        survival_func = model.predict_survival_function(input_df)
        return {
            "12_month": float(survival_func.iloc[12]),
            "36_month": float(survival_func.iloc[36]),
            "60_month": float(survival_func.iloc[60]),
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
