export interface IPageItemCategory {
  Id?: string;
  ParentId: string;
  Name: string;
  Description: string;
  path?: string;
}

export interface IPageItemCategoryTree {
  item: IPageItemCategory;
  //parent : IPageItemCategory
  children: IPageItemCategoryTree[];
}

export interface IPageItemCategoryFormValues
  extends Partial<IPageItemCategory> {
  time?: Date;
}

export class PageItemCategoryFormValues implements IPageItemCategory {
  Id?: string = undefined;
  ParentId: string = "";
  Name: string = "";
  Description: string = "";

  constructor(init?: IPageItemCategoryFormValues) {
    //debugger;
    Object.assign(this, init);
  }
}

export interface IPageItemCategoryList {
  key?: string;
  text?: string;
  value?: string;
  title?: string;
}
