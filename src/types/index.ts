export interface Language {
  code: string;
  name: string;
  native: string;
  rtl: number;
}

export interface Country {
  code: string;
  name: string;
  native: string;
  emoji: string;
  currency: string;
  languages: Language[];
  phone: string;
}

export interface Continent {
  code: string;
  name: string;
  countries: Country[];
}

export interface ContinentsData {
  continents: Continent[];
}
export interface ContinentData {
  continent: Continent;
}

export interface ContinentDataVariables {
  code: string | undefined;
}

export interface CountriesBarChartProps {
  continents?: Continent[];
}
