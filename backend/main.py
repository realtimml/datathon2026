from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class FieldData(BaseModel):
    crop_type: str
    field_area: float
    irrigation_type: str
    water_source: str
    mulching_used: bool
    previous_water_usage: float

def ml_model(pre_data: FieldData) -> float:
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
        ml_output = ml_model(field_data)
        return {"success": True, "predicted_water_usage": ml_output}
    except Exception as e:
        print(f"Error processing field data: {e}")
        return {"success": False, "predicted_water_usage": -1}