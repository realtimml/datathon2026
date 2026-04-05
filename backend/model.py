from pydantic import BaseModel
import joblib
import pandas as pd

# 1. Load the saved artifacts globally so they only load once at startup
model = joblib.load('optimized_xgb_model.joblib')
preprocessor = joblib.load('preprocessor.joblib')

# 2. Define the expected input structure
# NOTE: Adjust these variable names and types to perfectly match 
# the columns in the dataset you used to train your model.
class ModelInput(BaseModel):
    Soil_Type: str
    Soil_pH: float
    Organic_Carbon: float
    Electrical_Conductivity: float
    Temperature_C: float
    Humidity: float
    Rainfall_mm: float
    Sunlight_Hours: float
    Wind_Speed_kmh: float
    Crop_Type: str
    Crop_Growth_Stage: str
    Season: str
    Irrigation_Type: str
    Water_Source: str
    Field_Area_hectare: float
    Mulching_Used: str
    Previous_Irrigation_mm: float
    Region: str

# 3. Define the prediction endpoint
def predict(data: ModelInput):
    # Convert Pydantic input to a dictionary, then to a Pandas DataFrame
    # Note: Use data.model_dump() instead of data.dict() if you are using Pydantic v2
    new_data_raw = data.model_dump() 
    new_data_df = pd.DataFrame([new_data_raw])

    # Perform unit conversion exactly as you did in training
    new_data_df['Wind_Speed_ms'] = new_data_df['Wind_Speed_kmh'] / 3.6
    new_data_df = new_data_df.drop(columns=['Wind_Speed_kmh'])

    # CRITICAL: Use .transform(), NOT .fit_transform()
    # This applies the scaling and encoding rules learned from the training set
    new_data_processed = preprocessor.transform(new_data_df)

    # Run prediction
    prediction = model.predict(new_data_processed)
    
    # Return the prediction
    # Wrapped in float() because numpy float32/float64 are not natively JSON serializable
    return {
        "predicted_irrigation_liters": float(prediction[0])
    }

if __name__ == "__main__":
    # Test the model with sample data
    sample_input = ModelInput(
    Soil_Type="Loamy",
    Soil_pH=6.47,
    Organic_Carbon=0.95,
    Electrical_Conductivity=1.78,
    Temperature_C=27.1,
    Humidity=60.0,
    Rainfall_mm=1250.3,
    Sunlight_Hours=7.5,
    Wind_Speed_kmh=10.2,
    Crop_Type="Sugarcane",
    Crop_Growth_Stage="Vegetative",
    Season="Kharif",
    Irrigation_Type="Canal",
    Water_Source="Groundwater",
    Field_Area_hectare=7.5,
    Mulching_Used="No",
    Previous_Irrigation_mm=59.6,
    Region="Central"
)
    
    result = predict(sample_input)
    print("Test prediction result:")
    print(f"Predicted irrigation: {result['predicted_irrigation_liters']} liters")

