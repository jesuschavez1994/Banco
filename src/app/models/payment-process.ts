
export class DeliveryContactOfOrder implements DeliveryContactOfOrderData {
  commune_id: number;
  direction: string;
  house: number;
  phone: number;
  rut: number;
  address_latitude: number;
  address_longitude: number;

  constructor(
    data: DeliveryContactOfOrderData
  ){
    this.commune_id = data.commune_id;
    this.direction = data.direction;
    this.house = data.house;
    this.phone = data.phone;
    this.rut = data.rut;
    this.address_latitude = data.address_latitude;
    this.address_longitude = data.address_longitude;
  }

}

interface DeliveryContactOfOrderData {
  commune_id: number;
  direction: string;
  house: number;
  phone: number;
  rut: number;
  address_latitude: number;
  address_longitude: number;
}
