# 🎗 Breast Cancer Recurrence Risk Prediction Tool - Rekurze

## Demo

https://github.com/user-attachments/assets/03ee353e-305d-4318-bc08-333b47388e01

This project is a web-based tool that predicts the risk of breast cancer recurrence using a Cox Proportional Hazards Model trained on structured data from the Czech National Cancer Registry and National Registry of Reimbursed Health Services. 

It was created entirely **from scratch by a solo developer** as part of [Rakathon 2025](https://www.rakathon.cz), a healthcare innovation hackathon.

This tool helps visualise a patient’s risk of breast cancer recurrence progressively for 10 years post-diagnosis.

## Ideas for Future Development

The following features and expansions are being considered for future iterations:

- **Extend prediction window** to 15–20 years - longer-term data needed
- **LLM integration** to auto-comment and interpret hazard ratios for each case
- **Report integration with electronic medical documentation systems** - compliance with current practices needed
- **Automatic integration with UZIS**: The model could auto-run when a new patient is logged into the system, generating and sending the report to the treating physician
- **Add more clinical and behavioral features** (e.g., genomics, physical activity, comorbidities, lifestyle) for better long-term accuracy

## Limitations

1. Currently, no national recurrence registry exists in Czechia. The data had to be manually derived from proxy indicators.
2. The model was trained on narrow, specific patient characteristics, which causes it to overestimate risks for broader patient groups.
3. Plenty of missing data had to be imputed - low quality data.

## Parameters Tracked

For each patient, the following parameters are tracked and used in prediction:

- Age group at diagnosis  
- Tumor grade
- Clinical stage
- TNM Classification of Malignant Tumours in accordance with The Institute of Health Information and Statistics of the Czech Republic documentation or Ústav zdravotnických informací a statistiky ČR (ÚZIS)
-       T category describes the primary tumour site and size
-       N category describes the regional lymph node involvement.
-       M category describes the presence or otherwise of distant metastatic spread.
- Treatment modalities (chemotherapy, radiotherapy, targeted therapy)


## Dedication

This project is **dedicated to my mom** who is currently fighting breast cancer.  
Thank you for being my inspiration in health tech.

## References

The Institute of Health Information and Statistics of the Czech Republic: https://www.uzis.cz
Predict UK Tool: https://breast.predict.nhs.uk
Lifelines Documentation: https://lifelines.readthedocs.io
Cox Proportional Hazards Model – Statistical Basis

