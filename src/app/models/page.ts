export interface IPage {
  Id?: string;
  Title: string;
  Description?: string;
  CategoryId: string;
  Category?: string;
  URLTitle: string;
  PageHtml: string;
}

export class Page implements IPage {
  Id?: string = undefined;
  Title: string = "";
  Description?: string = "";
  CategoryId: string = "";
  //Category?: string;
  URLTitle: string = "";
  PageHtml: string = "";
  Photos: any[] = [];

  constructor(init?: IPage) {
    Object.assign(this, init);
  }
}

export interface IPagePhoto {
  Id: string;
  Url: string;
}
