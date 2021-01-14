export class Plan {
  constructor(
    public name: string,
    public productLoad: boolean,
    public contactInfo: boolean,
    public bussinessHours: boolean,
    public geoLocation: boolean,
    public price: number,
    public payType: string,
    public productsPics: {
      amount1?: boolean;
      amount2?: boolean;
      amount3?: boolean;
    },
    public productBankPrice?: number,
    public adquired?: boolean
  ) {}
}
