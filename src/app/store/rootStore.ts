import ActivityStore from "./activityStore";
import { createContext } from "react";
import UserStore from "./userStore";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modelStore";
import ProfileStore from "./profileStore";
import PageItemCategoryStore from "./pageItemCategoryStore";
import PageStore from "./pageStore";

configure({ enforceActions: "always" });

export class RootStore {
  activityStore: ActivityStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  pageItemCategoryStore: PageItemCategoryStore;
  pageStore: PageStore;

  constructor() {
    this.activityStore = new ActivityStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.profileStore = new ProfileStore(this);
    this.pageItemCategoryStore = new PageItemCategoryStore(this);
    this.pageStore = new PageStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
