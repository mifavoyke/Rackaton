# 🎗 Breast Cancer Recurrence Risk Prediction Tool - Rekurze

## 🖥 Demo

https://github.com/user-attachments/assets/03ee353e-305d-4318-bc08-333b47388e01

This project is a web-based tool that predicts the risk of breast cancer recurrence using a **Cox Proportional Hazards Model** trained on structured data from the Czech National Cancer Registry and National Registry of Reimbursed Health Services. 

It was created entirely **from scratch by a solo developer** as part of [Rakathon 2025](https://www.rakathon.cz), a healthcare innovation hackathon.

This tool helps visualise a patient’s risk of breast cancer recurrence progressively for **10 years** post-diagnosis. It offers an **interactive user interface**, generates a **PDF report**, and presents **hazard ratios** for selected clinical features to indicate their relative importance in the final prediction.

### 🚀 Live Features

- 🔢 **Recurrence risk for 10 years**
- 📊 **Hazard ratios with p-values**: Highlighting variables that influenced the result most
- 📄 **Downloadable PDF report** summarizing input, predictions, and model metrics
- 🌒 **Dark mode & Responsive UI** using Tailwind + shadcn
- 🌐 **Language toggle** (English/Czech)
- 🧪 Powered by `lifelines` (Python) and served via **FastAPI**
- 💻 Frontend built in **Next.js** with live interaction

---

## 💡 Ideas for Future Development

The following features and expansions are being considered for future iterations:

- 🔮 **Extend prediction window** to 15–20 years - longer-term data needed
- 🧠 **LLM integration** to auto-comment and interpret hazard ratios for each case
- 🧾 **Report integration with electronic medical documentation systems** - compliance with current practices needed
- 🧮 **Risk scoring by 5-year intervals** (e.g., high, moderate, low)
- ⚰️ **Add mortality risk prediction** alongside recurrence risk
- 🔁 **Automatic integration with UZIS**: The model could auto-run when a new patient is logged into the system, generating and sending the report to the treating physician
- 📊 **Add more clinical and behavioral features** (e.g., genomics, physical activity, comorbidities, lifestyle) for better long-term accuracy

---

## ⚠️ Limitations

- 🇨🇿 Currently, **no national recurrence registry** exists in Czechia. The data had to be manually derived from proxy indicators, which may introduce **bias**.
- 🧬 The model was trained on **narrow, specific patient characteristics**, which could cause it to **overestimate** risks for broader patient groups.
- 📉 Some clinical inputs were imputed based on domain heuristics due to missing data.

---

## 🧬 Parameters Tracked

For each patient, the following parameters are tracked and used in prediction:

- Age group at diagnosis  
- Tumor grade
- Clinical stage
- TNM Classification of Malignant Tumours in accordance with The Institute of Health Information and Statistics of the Czech Republic documentation or Ústav zdravotnických informací a statistiky ČR (ÚZIS)
      - T category describes the primary tumour site and size
      - N category describes the regional lymph node involvement.
      - M category describes the presence or otherwise of distant metastatic spread.
- Treatment modalities (chemotherapy, radiotherapy, targeted therapy) 

Only **user-selected variables** are included in the final hazard ratio table to reduce noise and maximise interpretability.

---

## 🛠️ Technologies

| Frontend       | Backend         | Model             |
|----------------|-----------------|-------------------|
| Next.js        | FastAPI         | Cox PH Model (`lifelines`) |
| React & Tailwind CSS | Pandas, Joblib | Trained on real-world data (Czech cancer registry) |

---

## 📁 Project Structure

rekurze/ ├── frontend/ # Next.js app (user interface) │ └── components/ # UI components │ └── pages/ # Routes and API calls ├── backend/ # FastAPI app (API + model) │ └── model/ # Saved Cox model (.pkl) │ └── main.py # API endpoints └── README.md

## 📦 Installation

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Make sure both the frontend and backend are running concurrently.

---

## 💖 Dedication

This project is **dedicated to my mom**, who overcame breast cancer in 2023.  
Thank you for being my inspiration in health tech.

📚 References

The Institute of Health Information and Statistics of the Czech Republic: https://www.uzis.cz
Predict UK Tool: https://breast.predict.nhs.uk
Lifelines Documentation: https://lifelines.readthedocs.io
Cox Proportional Hazards Model – Statistical Basis

📄 License

MIT License – use freely with attribution. See the LICENSE file for more information.

