import { RootStore } from "./rootStore";
import { action, observable, runInAction } from "mobx";
import { IPage, Page } from "../models/page";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { SyntheticEvent } from "react";

export default class PageStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable loadingInitial = false;
  @observable pageList: IPage[] = [];
  @observable pageItem: Page = new Page();

  @action createPageItem = async (page: IPage) => {
    debugger;
    this.submitting = true;
    try {
      await agent.PageItem.create(page);

      runInAction("create page", () => {
        this.submitting = false;
        toast.error("Created");
      });
      //history.push(`/pages/${page.id}`)
    } catch (error) {
      runInAction("create page error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data" + error.data.title);
      console.log(error.response);
    }
  };

  @action editPageItem = async (page: IPage) => {
    debugger;
    this.submitting = true;
    try {
      await agent.PageItem.update(page);
      runInAction("editing page", () => {
        this.submitting = false;
        toast.error("Updated");
      });
      //history.push(`/pages/${pages.id}`)
    } catch (error) {
      runInAction("edit page error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error);
    }
  };

  @action loadPageItem = async (id: string) => {
    this.loadingInitial = true;
    try {
      let page = await agent.PageItem.details(id);
      runInAction("getting page", () => {
        this.pageItem = page;
        this.loadingInitial = false;
      });
      return page;
    } catch (error) {
      console.log(error);
    }
  };

  @action getPageList = async () => {
    this.loadingInitial = true;
    let list = await agent.PageItem.list();
    runInAction("loading pages", () => {
      this.pageList = list;
      //debugger;
      this.loadingInitial = false;
    });
  };

  @action deletePageItem = async (id: string) => {
    this.submitting = true;
    try {
      await agent.PageItem.delete(id);
      runInAction("deleting page", () => {
        this.submitting = false;
        toast.error("deleted");
      });
    } catch (error) {
      runInAction("delete category error, ", () => {
        this.submitting = false;
        toast.error(
          "delete category error - " + error.data.errors.pageItemCategory
        );
      });
      console.log(error);
    }
  };
}
