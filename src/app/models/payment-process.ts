
export class RecipientContactOfOrder {
  constructor(
    data: RecipientContactOfOrderData
  ){}
}

interface RecipientContactOfOrderData {
  commune_id: number;
  direction: string;
  house: number;
  phone: number;
  rut: number;
  address_latitude: number;
  address_longitude: number;
}
