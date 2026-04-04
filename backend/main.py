from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def ml_model():
    # Placeholder for ML model logic
    # In a real implementation, this function would load a trained ML model and use it to make predictions based on input data
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

# TODO: Additional endpoints for user management, data processing, etc. can be added here
#our ML model will spit out the water needed in liters as a float/double
# then send to frontend a JSON

@app.post("/water-usage")
async def send_water_usage(ml_input: float):
    """Endpoint to get water usage prediction from ML model"""
    # Placeholder for ML model prediction logic
    ml_input = ml_model()
    return {"predicted_water_usage_liters": ml_input}