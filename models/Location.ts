export interface LocationData {
  name: string;
  description: string;
  address: string;
}

export interface Location extends LocationData {
  id: number
}
