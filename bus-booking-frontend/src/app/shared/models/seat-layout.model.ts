export interface SeatLayoutSeat {
  id: string;
  label: string;
  row: number;
  col: number;
  type: 'SEATER' | 'SLEEPER';
  ladies: boolean;
  price: number;
  deck: 'LOWER' | 'UPPER';
}

export interface SeatLayout {
  busId: number;
  rows: number;
  cols: number;
  seats: SeatLayoutSeat[];
}
