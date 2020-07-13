import { observable, action, runInAction } from "mobx";

import agent from "../../app/api/agent";
import { RootStore } from "../../app/store/rootStore";
import { StockManagemnt, IStockManagemnt } from "./StockManagemnt";

const IStockManagemntAPI = "/StockManagemnt";
const DBFun = {
  list: (): Promise<IStockManagemnt[]> =>
    agent.requests.get(IStockManagemntAPI),
  details: (Id: string) => agent.requests.get(`${IStockManagemntAPI}/${Id}`),
  create: (item: IStockManagemnt) =>
    agent.requests.post(IStockManagemntAPI, item),
  update: (item: IStockManagemnt) =>
    agent.requests.put(`${IStockManagemntAPI}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${IStockManagemntAPI}/${Id}`),
};

export default class StockManagemntStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable loadingInitial = false;
  @observable item: StockManagemnt = new StockManagemnt();
  @observable itemList: IStockManagemnt[] = [];

  @action loadItem = async (id: string) => {
    this.loadingInitial = true;
    try {
      let catlog = await DBFun.details(id);
      runInAction("getting item", () => {
        this.loadingInitial = false;
        this.item = catlog;
      });
      return catlog;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  @action getList = async () => {
    this.loadingInitial = true;
    try {
      let list: IStockManagemnt[] = [];
      list = await DBFun.list();
      runInAction("loading items", () => {
        this.itemList = list;
        this.loadingInitial = false;
      });
      return list;
    } catch (error) {
      runInAction("loading items error, ", () => {
        this.submitting = false;
        console.log(error);
        throw error;
      });
    }
  };

  @action createItem = async (stockManagemnt: IStockManagemnt) => {
    this.submitting = true;
    try {
      let itm = await DBFun.create(stockManagemnt);
      runInAction("create item", () => {
        this.item = itm;
        this.submitting = false;
      });
      return itm;
    } catch (error) {
      console.log(error);
      runInAction("create item error", () => {
        this.submitting = false;
        console.log(error);
      });
    }
  };

  @action editItem = async (stockManagemnt: IStockManagemnt) => {
    debugger;
    this.submitting = true;
    try {
      //let itm = await DBFun.update(stockManagemnt);
      let itm = null;
      if (stockManagemnt.Id) {
        itm = await DBFun.update(stockManagemnt);
      } else {
        itm = await DBFun.create(stockManagemnt);
      }

      runInAction("editing item", () => {
        this.submitting = false;
      });
      return itm;
    } catch (error) {
      runInAction("edit item error", () => {
        this.submitting = false;
      });
      console.log(error);
      throw error;
    }
  };

  @action deleteItem = async (id: string) => {
    this.submitting = true;
    try {
      await DBFun.delete(id);
      runInAction("deleting item", () => {
        this.submitting = false;
      });
    } catch (error) {
      runInAction("Item delete error, ", () => {
        this.submitting = false;
      });
      console.log(error);
      throw error;
    }
  };
}
