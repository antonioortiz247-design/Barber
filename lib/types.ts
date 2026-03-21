export type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
};

export type Appointment = {
  id: string;
  date: string;
  time: string;
  service_id: string;
  client_name: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  service?: Service;
};

export type Availability = {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
};

export type BlockedSlot = {
  id: string;
  date: string;
  time: string;
};

export type SlotState = 'available' | 'occupied' | 'blocked' | 'outside';

export type BarberSettings = {
  brandName: string;
  city: string;
  logoUrl: string;
  whatsappNumber: string;
  accentColor: string;
  slotInterval: 30 | 60;
};
