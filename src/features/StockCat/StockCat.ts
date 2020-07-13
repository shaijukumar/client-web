export interface IStockCat {
	Id: string
	Title: string
}

export class StockCat implements IStockCat {
	Id: string = '';
	Title: string = '';
  
  constructor(init?: IStockCat) {
    Object.assign(this, init);
  }
}

