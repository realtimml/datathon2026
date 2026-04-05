from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from api_calls import get_global_region, get_humidity, get_sunshine_duration, get_temperature, get_wind_speed, get_season, get_yearly_average_rainfall
from model import ModelInput, predict

from api_calls import get_temperature

class FieldData(BaseModel):
    Soil_Type: str # TODO: provided by frontend
    Soil_pH: float # TODO:  provided by frontend
    Electrical_Conductivity: float # TODO: provided by frontend
    Crop_Type: str # provided by frontend
    Crop_Growth_Stage: str # TODO: provided by frontend
    Irrigation_Type: str # provided by frontend
    Water_Source: str # provided by frontend
    Field_Area_hectare: float # provided by frontend
    Mulching_Used: str # provided by frontend
    Previous_Irrigation_mm: float # provided by frontend
    Organic_Carbon: float # provided by frontend
    latitude: float # provided by frontend
    longitude: float # provided by frontend

def ml_model(input_data: ModelInput) -> float:
    prediction = predict(input_data)
    return prediction.get("predicted_irrigation_liters")

app = FastAPI(
    title="Datathon 2026 API",
    description="Backend API for Datathon 2026 application",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["test", "localhost link"],  # connect to react dev server :)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root(): # where the fastAPI runs from (root)
    """Root endpoint - welcome message test"""
    return {
        "message": "Welcome to Datathon 2026 API",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint to check if the server is running and working properly -dz"""
    return {"status": "healthy"}

#our ML model will spit out the water needed in liters as a float/double
# then send to frontend a JSON
# TODO: API Calls to get additional data from external sources (e.g., weather data, soil data) can be implemented here as well
@app.post("/field_data")
async def receive_field_data(field_data: FieldData):
    """Endpoint to receive field data from the frontend"""
    try:
        print(f"Received field data: {field_data}")
        # Get current month as an integer
        now = datetime.now()
        # Would need Frontend to send the lat and long of the field/convert from a location
        temp = get_temperature(field_data.latitude, field_data.longitude) 
        wind_speed =    get_wind_speed(field_data.latitude, field_data.longitude)
        sunshine_duration = get_sunshine_duration(field_data.latitude, field_data.longitude)
        humidity = get_humidity(field_data.latitude, field_data.longitude)
        season = get_season(now.month)
        region = get_global_region(field_data.latitude, field_data.longitude)
        rain_amt = get_yearly_average_rainfall(field_data.latitude, field_data.longitude)
        input_data = ModelInput(
            Soil_Type=field_data.Soil_Type,
            Soil_pH=field_data.Soil_pH,
            Organic_Carbon=field_data.Organic_Carbon,
            Electrical_Conductivity=field_data.Electrical_Conductivity,
            Temperature_C=temp,
            Humidity=humidity,
            Rainfall_mm=rain_amt,
            Sunlight_Hours=sunshine_duration,
            Wind_Speed_kmh=wind_speed,  # Convert m/s to km/h
            Crop_Type=field_data.Crop_Type,
            Crop_Growth_Stage=field_data.Crop_Growth_Stage,
            Season=season,
            Irrigation_Type=field_data.Irrigation_Type,
            Water_Source=field_data.Water_Source,
            Field_Area_hectare=field_data.Field_Area_hectare,
            Mulching_Used=field_data.Mulching_Used,
            Previous_Irrigation_mm=field_data.Previous_Irrigation_mm,
            Region=region
        )
        ml_output = ml_model(input_data)
        return {"success": True, "predicted_water_usage": ml_output}
    except Exception as e:
        print(f"Error processing field data: {e}")
        return {"success": False, "predicted_water_usage": -1}
