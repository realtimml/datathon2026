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