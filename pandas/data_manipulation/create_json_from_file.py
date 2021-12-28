import pandas as pd
import json as json

# loading cities and state csv files
df_cities_lat_lng = pd.read_csv('../files/brazil/cities_lat_lng.csv', delimiter=',')
df_cities_population = pd.read_csv('../files/brazil/cities_population.csv', delimiter=',', converters={'codigo_municipio': lambda x: str(x)}, decimal='.')
df_states = pd.read_csv('../files/brazil/states.csv', delimiter=',')

# combining codigo_uf and codigo_municipio in order to create codigo_ibge column
df_cities_population['codigo_municipio'] = df_cities_population['codigo_municipio'].apply(lambda x: x.zfill(5))
df_cities_population['codigo_ibge'] = df_cities_population['codigo_uf'].astype(str) + df_cities_population['codigo_municipio'].astype(str)

# merge df_cities_lat_lng and df_cities_population on codigo_ibge
df_cities_lat_lng['codigo_ibge'] = df_cities_lat_lng['codigo_ibge'].astype(str)
df_cities_population['codigo_ibge'] = df_cities_population['codigo_ibge'].astype(str)
merge_cities_df = pd.merge(df_cities_lat_lng, df_cities_population, on='codigo_ibge')

df_cities = merge_cities_df[['nome', 'latitude','longitude', 'capital', 'uf', 'populacao_estimada', 'codigo_uf_x']]

df_cities.rename(
  columns={
    'codigo_uf_x': 'codigo_uf',
  }, inplace=True
)

# merging dataframes using codigo_uf
merge = pd.merge(df_cities, df_states, on='codigo_uf')

# selecting city name, lat, lon, uf (state abbreviation) and state name
selected_cols = merge[['nome_x','latitude_x','longitude_x', 'uf_x', 'nome_y', 'populacao_estimada', 'capital']]

selected_cols['capital'].replace({0: False, 1: True}, inplace=True)

selected_cols.rename(
  columns={
    'nome_x': 'name',
    'latitude_x': 'lat',
    'longitude_x': 'lng',
    'nome_y': 'state_name',
    'uf_x': 'state_abbreviation',
    'populacao_estimada': 'population',
    'capital': 'is_capital'
  }, inplace=True
)

selected_cols['id'] = selected_cols.index + 1

selected_cols['population'] = selected_cols['population'].astype(float)

population_min_max_normalization = (selected_cols['population']-selected_cols['population'].min())/(selected_cols['population'].max()-selected_cols['population'].min())

# removing all accents from the cities names
selected_cols['name_normalized'] = selected_cols['name'].str.normalize('NFKD').str.encode('ascii', errors='ignore').str.decode('utf-8')
# uppercase nornalized cities names
selected_cols['uppercase_name_nomalized'] = selected_cols['name_normalized'].str.upper()

selected_cols['population_min_max_normalization'] = population_min_max_normalization

del selected_cols['name_normalized']

brazil_cities_json = json.loads(selected_cols.to_json(orient='records'))

with open('../data/brazil_cities.json', 'w', encoding='utf-8') as f:
    json.dump(brazil_cities_json, f, ensure_ascii=False).encode('utf8')
