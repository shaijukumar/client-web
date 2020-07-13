import { observable, action, runInAction } from "mobx";

import agent from "../../app/api/agent";
import { RootStore } from "../../app/store/rootStore";
import { StockCat, IStockCat } from "./StockCat";

const IStockCatAPI = "/StockCat";
const DBFun = {
  list: (): Promise<IStockCat[]> => agent.requests.get(IStockCatAPI),
  details: (Id: string) => agent.requests.get(`${IStockCatAPI}/${Id}`),
  create: (item: IStockCat) => agent.requests.post(IStockCatAPI, item),
  update: (item: IStockCat) =>
    agent.requests.put(`${IStockCatAPI}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${IStockCatAPI}/${Id}`),
};

export default class StockCatStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable loadingInitial = false;
  @observable item: StockCat = new StockCat();
  @observable itemList: IStockCat[] = [];

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
      let list: IStockCat[] = [];
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

  @action createItem = async (stockCat: IStockCat) => {
    this.submitting = true;
    try {
      let itm = await DBFun.create(stockCat);
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

  @action editItem = async (stockCat: IStockCat) => {
    this.submitting = true;
    try {
      //let itm = await DBFun.update(stockCat);
      let itm = null;
      if (stockCat.Id) {
        itm = await DBFun.update(stockCat);
      } else {
        itm = await DBFun.create(stockCat);
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

