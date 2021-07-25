import pandas as pd
import json as json

# loading cities and state csv files
df_cities = pd.read_csv('../files/brazil/cities.csv', delimiter=',')
df_states = pd.read_csv('../files/brazil/states.csv', delimiter=',')

# merging dataframes using codigo_uf
merge = pd.merge(df_cities, df_states, on='codigo_uf')

# selecting city name, lat, lon, uf (state abbreviation) and state name
selected_cols = merge[['nome_x','latitude_x','longitude_x', 'uf', 'nome_y']]

selected_cols.rename(
  columns={
    'nome_x': 'name',
    'latitude_x': 'lat',
    'longitude_x': 'lon',
    'nome_y': 'state_name',
    'uf': 'state_abbreviation'
  }, inplace=True)

# removing all accents from the cities names
selected_cols['name_normalized'] = selected_cols['name'].str.normalize('NFKD').str.encode('ascii', errors='ignore').str.decode('utf-8')
# uppercase nornalized cities names
selected_cols['uppercase_name_nomalized'] = selected_cols['name_normalized'].str.upper()

del selected_cols['name_normalized']

brazil_ciities_json = json.loads(selected_cols.to_json(orient='records'))

with open('../data/brazil_cities.json', 'w', encoding='utf-8') as f:
    json.dump(brazil_ciities_json, f, ensure_ascii=False).encode('utf8')
