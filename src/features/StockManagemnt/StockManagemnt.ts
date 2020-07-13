export interface IStockManagemnt {
	Id: string
	Title: string
	Category: string
	QtyType: string
	RequiredStock: number
	CurrentStock: number
	ShopTag: boolean 
}

export class StockManagemnt implements IStockManagemnt {
	Id: string = '';
	Title: string = '';
	Category: string = '';
	QtyType: string = '';
	RequiredStock: number = 0;
	CurrentStock: number = 0;
	ShopTag: boolean  = false;
  
  constructor(init?: IStockManagemnt) {
    Object.assign(this, init);
  }
}

