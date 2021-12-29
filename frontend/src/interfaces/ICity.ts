export enum StateAbbreviationEnum {
  'AC' = 'AC',
  'AL' = 'AL',
  'AP' = 'AP',
  'AM' = 'AM',
  'BA' = 'BA',
  'CE' = 'CE',
  'DF' = 'DF',
  'ES' = 'ES',
  'GO' = 'GO',
  'MA' = 'MA',
  'MT' = 'MT',
  'MS' = 'MS',
  'MG' = 'MG',
  'PA' = 'PA',
  'PB' = 'PB',
  'PR' = 'PR',
  'PE' = 'PE',
  'PI' = 'PI',
  'RJ' = 'RJ',
  'RN' = 'RN',
  'RS' = 'RS',
  'RO' = 'RO',
  'RR' = 'RR',
  'SC' = 'SC',
  'SP' = 'SP',
  'SE' = 'SE',
  'TO' = 'TO'
}

export interface ICity {
  id: number;
  is_capital: boolean;
  lat: number;
  lng: number;
  name: string;
  population: number;
  population_min_max_normalization: number;
  state_abbreviation: StateAbbreviationEnum;
  state_name: string;
  uppercase_name_nomalized: string;
};
