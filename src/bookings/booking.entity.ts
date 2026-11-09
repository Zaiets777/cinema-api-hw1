export class Booking {
  id: string;
  showingId: string;
  seats: { row: number; seat: number }[];
  totalPrice: number;
}