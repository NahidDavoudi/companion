import requests
import pandas as pd
from datetime import datetime, timedelta
from matplotlib import pyplot as plt

def get_btc_prices():
    url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart"
    params = {
        'vs_currency': 'usd',
        'days': '30',
        'interval': 'daily'
    }
    
    response = requests.get(url)
    data = response.json()
    return data['prices']


def convert_timestamp(ts):
    return datetime.fromtimestamp(ts/1000).strftime('%Y-%m-%d')

def save_data(prices):
    df = pd.DataFrame(prices, columns=['timestamp', 'price'])
    df['date'] = df['timestamp'].apply(convert_timestamp)
    df = df[['date', 'price']]
    

get_btc_prices()





