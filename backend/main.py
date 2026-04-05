from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from backend.api_calls import get_global_region, get_humidity, get_sunshine_duration, get_temperature, get_wind_speed, get_season, get_yearly_average_rainfall

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

def ml_model(pre_data: FieldData, temperature: float, wind_speed: float, sunshine_duration: float, humidity: float, season: str, region: str, rainfall_amt: float) -> float:
    # Placeholder for ML model logic
    # In a real implementation, this function would load a trained ML model and use it to make predictions based on input data
    # field data consists of the pydantic data strucuture above, input into ml model then spit out API call :>
    return 123.45  # Example predicted water usage in liters

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
        ml_output = ml_model(field_data, temp, wind_speed, sunshine_duration, humidity, season, region, rain_amt)
        return {"success": True, "predicted_water_usage": ml_output}
    except Exception as e:
        print(f"Error processing field data: {e}")
        return {"success": False, "predicted_water_usage": -1}
