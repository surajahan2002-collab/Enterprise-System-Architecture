"""
Architecture: MLOps & Model Serving (Microservices)
Domain: DDPM Enterprise AI Integration
Framework: FastAPI
Objective: Exposing the trained Machine Learning model as a highly available, real-time REST API.
"""

import logging
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

# 1. Enterprise Logging Configuration
logging.basicConfig(level=logging.INFO, format='%(asctime)s [ML-API] %(message)s')
logger = logging.getLogger(__name__)

# 2. Application Initialization
app = FastAPI(
    title="DDPM AI Inference Engine",
    description="Real-time predictive analytics for project risk evaluation.",
    version="1.0.0"
)

# 3. Global Model State
# The model is loaded once into memory when the server starts to guarantee O(1) inference latency.
ML_MODEL = None

@app.on_event("startup")
async def load_model():
    global ML_MODEL
    try:
        logger.info("Initializing ML Inference Engine...")
        # Loading the serialized model generated in Step 34
        ML_MODEL = joblib.load("../Step-34-Machine-Learning-Foundations/ddpm_risk_model_v1.pkl")
        logger.info("Random Forest Model loaded into memory successfully.")
    except Exception as e:
        logger.error(f"Critical Fault: Failed to load ML model. {str(e)}")
        # In a real environment, we would trigger an alert to the DevOps team here.

# 4. Input Payload Validation (Pydantic Schema)
# Enforces strict data types before the payload ever reaches the mathematical model.
class ProjectTelemetryPayload(BaseModel):
    budget_variance: float = Field(..., description="Deviation from the baseline budget (%)")
    team_velocity: float = Field(..., description="Average story points completed per sprint")
    overdue_tasks: int = Field(..., description="Absolute count of critical overdue tasks")

# 5. The Inference Endpoint
@app.post("/api/v1/predict/project-risk")
async def predict_risk(payload: ProjectTelemetryPayload):
    if ML_MODEL is None:
        raise HTTPException(status_code=503, detail="Inference engine is currently unavailable.")
    
    try:
        # Transforming the validated JSON payload into a DataFrame for the scikit-learn model
        input_features = pd.DataFrame([{
            'budget_variance': payload.budget_variance,
            'team_velocity': payload.team_velocity,
            'overdue_tasks': payload.overdue_tasks
        }])

        logger.info(f"Executing real-time inference for payload: {payload.dict()}")
        
        # Executing the prediction algorithm
        prediction = ML_MODEL.predict(input_features)
        
        # Mathematical Mapping: 1 = Critical Risk (Failure), 0 = Nominal (Success)
        is_at_risk = bool(prediction[0] == 1)
        
        return {
            "prediction_status": "SUCCESS",
            "risk_assessment": {
                "is_critical_risk": is_at_risk,
                "recommended_action": "Immediate Audit Required" if is_at_risk else "Proceed as Planned"
            }
        }
        
    except Exception as e:
        logger.error(f"Inference Fault: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal AI Engine Error")

# ============================================================================
# 🚀 EXECUTION ENTRY POINT
# ============================================================================
if __name__ == "__main__":
    import uvicorn
    # Running the ASGI server
    uvicorn.run(app, host="0.0.0.0", port=8000)
