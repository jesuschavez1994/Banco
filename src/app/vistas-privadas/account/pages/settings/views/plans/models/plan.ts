import { BonusDetails, ProductBankDetails } from '../interfaces/Plans';

export class Plan {
  constructor(
    public id: number,
    public name: string,
    public basicPrice: number,
    public planBonuses: Array<BonusDetails>,
    public productBank: Array<ProductBankDetails>,
    public adquired?: boolean
  ) {}
}
