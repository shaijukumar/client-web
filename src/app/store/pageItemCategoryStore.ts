import { RootStore } from "./rootStore";
import { observable, computed, runInAction, action } from "mobx";
import agent from "../api/agent";
import {
  IPageItemCategory,
  IPageItemCategoryTree,
  IPageItemCategoryList,
} from "../models/PageItemCategory";
import React, { SyntheticEvent } from "react";
import { toast } from "react-toastify";

export default class PageItemCategoryStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable category: IPageItemCategory | null = null;

  @observable pageItemCategorys: IPageItemCategory[] = [];
  @observable CategoryTree: IPageItemCategoryTree[] = [];
  @observable loadingInitial = false;

  @observable submitting = false;

  @observable target = "";

  @observable pageItemCategoryList: IPageItemCategoryList[] = [];

  @observable catTree: any;

  updateChildren(
    childrenList: IPageItemCategory[],
    parentNode: IPageItemCategoryTree
  ): any {
    childrenList.forEach((cat) => {
      if (parentNode.item.Id == cat.ParentId) {
        const temp: IPageItemCategoryTree[] = [];
        const node = { item: cat, children: temp };
        node.item.path = `${parentNode.item.path} > ${node.item.Name}`; // node.item.name + "" + node.item.name;
        parentNode.children.push(node);
        this.pageItemCategoryList.push({
          key: node.item.Id,
          text: node.item.path,
          value: node.item.Id,
          title: node.item.Name,
        });
        this.updateChildren(childrenList, node);
      }
    });
  }

  updatecatChild(chList: any[], parent: any): any {
    chList.forEach((cat) => {
      if (parent.value == cat.parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(cat);
        this.updatecatChild(chList, cat);
      }
    });
  }

  @action UpdateCategoryList = async () => {
    // debugger;
    let catTree: any[] = [];
    let catChild: any[] = [];
    var categorys = await agent.PageItemCategory.list();

    runInAction("loading Categorys", () => {
      this.catTree = categorys;
    });

    categorys.forEach((cat) => {
      var treeNode: any = {};
      treeNode.value = cat.Id;
      treeNode.label = cat.Name;
      treeNode.parent = cat.ParentId;
      if (cat.ParentId == cat.Id) {
        catTree.push(treeNode);
      } else {
        catChild.push(treeNode);
      }
    });

    catTree.forEach((tr) => {
      this.updatecatChild(catChild, tr);
    });

    return catTree;
  };

  @action getPageItemCategoryList = async () => {
    let tree: IPageItemCategoryTree[] = [];
    debugger;
    this.loadingInitial = true;
    var categorys = await agent.PageItemCategory.list();
    runInAction("loading Categorys", () => {
      const childrenList: IPageItemCategory[] = [];

      //Get all root nodes
      categorys.forEach((cat) => {
        //this.pageItemCategoryList.push({ key: cat.id, text:  cat.name, value: cat.id, title:  cat.name });

        if (cat.ParentId == cat.Id) {
          const temp: IPageItemCategoryTree[] = [];
          cat.path = cat.Name;
          const node = { item: cat, children: temp };
          tree.push(node);
          this.pageItemCategoryList.push({
            key: cat.Id,
            text: cat.path,
            value: cat.Id,
            title: cat.Name,
          });
        } else {
          childrenList.push(cat);
        }
      });

      //add children
      tree.forEach((tr) => {
        this.updateChildren(childrenList, tr);
      });

      this.CategoryTree = tree;

      this.pageItemCategorys = categorys;
      this.loadingInitial = false;
    });
  };

  @action createPageItemCategory = async (category: IPageItemCategory) => {
    debugger;
    this.submitting = true;
    try {
      await agent.PageItemCategory.create(category);

      runInAction("create category", () => {
        this.submitting = false;
        toast.error("Created");
      });
      //history.push(`/activities/${activity.id}`)
    } catch (error) {
      runInAction("create category error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action editPageItemCategory = async (category: IPageItemCategory) => {
    //debugger;
    this.submitting = true;
    try {
      if (category.Id == undefined) {
        await agent.PageItemCategory.create(category);
      } else {
        await agent.PageItemCategory.update(category);
      }

      runInAction("updating category", () => {
        this.submitting = false;
        toast.error("Updated");
      });
      //history.push(`/createCategory/${category.id}`)
    } catch (error) {
      runInAction("edit category error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data 11");
      console.log(error);
    }
  };

  @action deletePageItemCategory = async (id: string) => {
    this.submitting = true;

    try {
      await agent.PageItemCategory.delete(id);
      runInAction("deleting category", () => {
        this.submitting = false;
        toast.error("deleted");
      });
    } catch (error) {
      runInAction("delete category error, ", () => {
        this.submitting = false;
        debugger;
        toast.error(
          "delete category error - " + error.data.errors.pageItemCategory
        );
      });
      console.log(error);
    }
  };

  @action loadPageItemCategory = async (id: string) => {
    this.loadingInitial = true;
    try {
      let category = await agent.PageItemCategory.details(id);
      runInAction("getting category", () => {
        this.loadingInitial = false;
      });
      return category;
    } catch (error) {
      console.log(error);
    }
  };
}
