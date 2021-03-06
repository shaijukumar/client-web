import ActivityStore from "./activityStore";
import { createContext } from "react";
import UserStore from "./userStore";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modelStore";
import ProfileStore from "./profileStore";
import PageItemCategoryStore from "./pageItemCategoryStore";
import PageStore from "./pageStore";
import StockCatStore from "../../features/StockCat/StockCatStore";
import StockManagemntStore from "../../features/StockManagemnt/StockManagemntStore";
//##RootImport##

configure({ enforceActions: "always" });

export class RootStore {
  activityStore: ActivityStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  pageItemCategoryStore: PageItemCategoryStore;
  pageStore: PageStore;
  stockCatStore: StockCatStore;
  stockManagemntStore: StockManagemntStore;
  //##RootField##

  constructor() {
    this.activityStore = new ActivityStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.profileStore = new ProfileStore(this);
    this.pageItemCategoryStore = new PageItemCategoryStore(this);
    this.pageStore = new PageStore(this);
    this.stockCatStore = new StockCatStore(this);
    this.stockManagemntStore = new StockManagemntStore(this);
    //##RootFieldConstructor##
  }
}

export const RootStoreContext = createContext(new RootStore());
