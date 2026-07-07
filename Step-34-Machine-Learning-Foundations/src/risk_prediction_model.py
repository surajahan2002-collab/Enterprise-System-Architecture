"""
Architecture: Machine Learning Foundations (Predictive Analytics)
Domain: DDPM Enterprise Risk Management
Algorithm: Random Forest Classifier (Ensemble Learning)
Objective: Training a supervised model to predict project failure probabilities.
"""

import logging
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib

# 1. Enterprise Logging Configuration
logging.basicConfig(level=logging.INFO, format='%(asctime)s [ML-CORE] %(message)s')
logger = logging.getLogger(__name__)

class ProjectRiskPredictor:
    def __init__(self):
        # Initializing an Ensemble Model (Random Forest)
        # We use 100 decision trees to prevent overfitting (Bias-Variance Tradeoff)
        self.model = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')

    def _simulate_data_ingestion(self) -> pd.DataFrame:
        """
        Simulates ingesting the structured Data Lake output from Step 33.
        Features: budget_variance, team_velocity, overdue_tasks
        Target: is_critical_risk (1 for Failure, 0 for Success)
        """
        logger.info("Ingesting historical telemetry data from Data Lake...")
        np.random.seed(42)
        samples = 5000
        
        return pd.DataFrame({
            'budget_variance': np.random.normal(0, 15, samples),
            'team_velocity': np.random.normal(50, 10, samples),
            'overdue_tasks': np.random.poisson(3, samples),
            # Synthetic logic determining the risk outcome based on features
            'is_critical_risk': np.where(
                (np.random.normal(0, 15, samples) > 10) | (np.random.poisson(3, samples) > 5), 1, 0
            )
        })

    def train_and_evaluate(self, model_export_path: str):
        try:
            # 2. Data Preparation
            df = self._simulate_data_ingestion()
            X = df.drop('is_critical_risk', axis=1) # Features (Independent Variables)
            y = df['is_critical_risk']              # Target (Dependent Variable)

            # Splitting data: 80% for training the algorithm, 20% for testing its accuracy
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

            # 3. Model Training (Fitting the mathematical curve)
            logger.info("Executing algorithmic training phase (Fitting 100 Decision Trees)...")
            self.model.fit(X_train, y_train)

            # 4. Model Evaluation (Testing against unseen data)
            logger.info("Evaluating model accuracy and precision...")
            predictions = self.model.predict(X_test)
            
            # Generating Academic Quality Metrics
            report = classification_report(y_test, predictions)
            logger.info(f"\n--- Model Performance Classification Report ---\n{report}")

            # 5. Model Serialization (Saving to disk)
            logger.info(f"Serializing trained model to {model_export_path}")
            joblib.dump(self.model, model_export_path)
            
            logger.info("ML Pipeline Execution Terminated Successfully.")

        except Exception as e:
            logger.error(f"Algorithmic Fault: {str(e)}")
            raise

# ============================================================================
# 🚀 EXECUTION ENTRY POINT
# ============================================================================
if __name__ == "__main__":
    predictor = ProjectRiskPredictor()
    # In production, this .pkl file is uploaded to an ML artifact repository
    predictor.train_and_evaluate(model_export_path="ddpm_risk_model_v1.pkl")
