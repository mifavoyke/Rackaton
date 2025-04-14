# 🎗 Breast Cancer Recurrence Risk Prediction Tool - Rekurze

## 🖥 Demo

https://github.com/user-attachments/assets/03ee353e-305d-4318-bc08-333b47388e01

A web-based application that predicts the individualized risk of breast cancer recurrence at 1, 5, and 10 years based on real clinical data. Powered by a Cox Proportional Hazards model and built with FastAPI + Next.js, the tool is designed to support clinicians and patients with transparent, data-driven insights into treatment outcomes.

---

## 🧠 Motivation

Early-stage breast cancer patients face uncertainty about their prognosis, especially after initial treatment. This tool aims to fill that gap by providing recurrence risk estimates based on key clinical indicators—supporting decision-making around follow-up treatment, surveillance, and patient counseling.

---

## 💡 How It Works

- **Backend**: A Cox Proportional Hazards model implemented in Python using the `lifelines` package.
- **Frontend**: A user-friendly interface built with Next.js (React), allowing users to input patient data and view recurrence risk in real time.
- **Prediction**: The model calculates recurrence risks at 1, 5, and 10 years and visualizes them via progress bars.
- **Explainability**: The app also displays which variables contributed most to the prediction (via hazard ratios).

---

## 🚀 Features

- 🔬 Survival prediction at 1, 5, and 10 years  
- ✅ Real-time, form-based input  
- 📊 Visual risk display with progress bars  
- 💬 Model output explanation (hazard ratios for selected features)  
- 🌐 CORS-enabled API for easy frontend/backend integration

---

## 🛠️ Technologies

| Frontend       | Backend         | Model             |
|----------------|-----------------|-------------------|
| Next.js        | FastAPI         | Cox PH Model (`lifelines`) |
| React & Tailwind CSS | Pandas, Joblib | Trained on real-world data (Czech cancer registry) |

---

## 📁 Project Structure

breast-cancer-prediction/ ├── frontend/ # Next.js app (user interface) │ └── components/ # UI components │ └── pages/ # Routes and API calls ├── backend/ # FastAPI app (API + model) │ └── model/ # Saved Cox model (.pkl) │ └── main.py # API endpoints └── README.md

---

## 🧪 Sample Input Variables

- Tumor stage (T, N, M classification)
- Tumor grade
- Chemotherapy, radiotherapy, targeted therapy
- Age group at diagnosis
- Clinical stage

_Only selected variables (with value `1`) are shown in the output report._

---

## 📦 Installation

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
2. Frontend
cd frontend
npm install
npm run dev
Make sure both the frontend and backend are running concurrently.

📚 References

Lifelines Documentation: https://lifelines.readthedocs.io
Predict UK Tool: https://breast.predict.nhs.uk
Cox Proportional Hazards Model – Statistical Basis

📄 License

MIT License – use freely with attribution. See the LICENSE file for more information.
