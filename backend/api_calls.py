from urllib import response

import requests

def get_temperature(latitude, longitude):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true&forecast_days=1"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data['current_weather']['temperature']
    else:
        print(f"Error fetching temperature data: {response.status_code}")
        return None
    
def get_humidity(latitude, longitude):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&daily=relative_humidity_2m_mean&current_weather=true&forecast_days=1"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data['daily']['relative_humidity_2m'][0]
    else:
        print(f"Error fetching humidity data: {response.status_code}")
        return None
    
# TODO: rainfall?

def get_sunshine_duration(latitude, longitude):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&daily=sunshine_duration&timezone=auto&forecast_days=1"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return (data['daily']['sunshine_duration'][0] // 3600)
    else:
        print(f"Error fetching sunshine duration data: {response.status_code}")
        return None

def get_wind_speed(latitude, longitude):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data['current_weather']['windspeed']
    else:
        print(f"Error fetching wind speed data: {response.status_code}")
        return None
    
def get_season(month: int):
    if not 1 <= month <= 12:
        raise ValueError(f"Invalid month '{month}'. Must be between 1 and 12.")

    if month in (6, 7, 8, 9, 10, 11):     # June – November
        return "Kharif"
    elif month in (12, 1, 2, 3):           # December – March
        return "Rabi"
    else:                                   # April – May
        return "Zaid"
    

def get_global_region(latitude: float, longitude: float) -> str:
    """
    Returns the broad global directional region based on latitude and longitude.

    Global Region Boundaries:
    NORTH  │  lat > 55°N  (Northern Europe, Russia, Canada, Alaska)
    SOUTH  │  lat < -23°S (Sub-Saharan Africa, S. America, Australia)
    EAST   │  lon > 45°E  and lat between -23°S and 55°N 
    │         │  (Asia, South Asia, SE Asia, Middle East, East Africa) 
    WEST   │  lon < -30°W and lat between -23°S and 55°N             
    │         │  (North America, Caribbean, South America)               
    CENTRAL│  lon between -30°W and 45°E, lat between -23°S and 55°N
    │         │  (Western/Central Europe, North Africa, West Africa) 
    """
    if not -90.0 <= latitude <= 90.0:
        raise ValueError(f"Invalid latitude '{latitude}'. Must be between -90 and 90.")
    if not -180.0 <= longitude <= 180.0:
        raise ValueError(f"Invalid longitude '{longitude}'. Must be between -180 and 180.")

    # Latitude/longitude thresholds
    NORTH_LAT_THRESHOLD   =  55.0
    SOUTH_LAT_THRESHOLD   = -23.0
    EAST_LON_THRESHOLD    =  45.0
    WEST_LON_THRESHOLD    = -30.0 

    if latitude > NORTH_LAT_THRESHOLD:
        return "North"

    if latitude < SOUTH_LAT_THRESHOLD:
        return "South"

    # Mid-latitude band: use longitude to determine East / West / Central
    if longitude > EAST_LON_THRESHOLD:
        return "East"

    if longitude < WEST_LON_THRESHOLD:
        return "West"

    return "Central"
