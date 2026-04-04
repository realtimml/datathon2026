import requests

def get_temperature(latitude, longitude):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data['current_weather']['temperature']
    else:
        print(f"Error fetching temperature data: {response.status_code}")
        return None
    
    