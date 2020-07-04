import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IProfile, IPhoto } from "../models/profile";
import { IPageItemCategory } from "../models/PageItemCategory";
import { IPage } from "../models/page";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error - check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(10)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(10)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(10)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(10)).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
  attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
  unattend: (id: string) => requests.del(`/activities/${id}/attend`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
};

const Profiles = {
  get: (username: string): Promise<IProfile> =>
    requests.get(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> =>
    requests.postForm(`/photos`, photo),
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.del(`/photos/${id}`),
  updateProfile: (profile: Partial<IProfile>) =>
    requests.put(`/profiles`, profile),
  follow: (username: string) =>
    requests.post(`/profiles/${username}/follow`, {}),
  unfollow: (username: string) => requests.del(`/profiles/${username}/follow`),
  listFollowings: (username: string, predicate: string) =>
    requests.get(`/profiles/${username}/follow?predicate=${predicate}`),
};

const PageItemCategory = {
  list: (): Promise<IPageItemCategory[]> => requests.get("/PageCategory"),
  details: (id: string) => requests.get(`/PageCategory/${id}`),
  create: (category: IPageItemCategory) =>
    requests.post("/PageCategory", category),
  update: (category: IPageItemCategory) =>
    requests.put(`/PageCategory/${category.Id}`, category),
  delete: (id: string) =>
    requests.del(`/PageCategory/${id}`).then(sleep(400)).then(responseBody),
};

const PageItem = {
  list: (): Promise<IPage[]> => requests.get("/Pages"),
  details: (id: string) => requests.get(`/Pages/${id}`),
  create: (page: IPage) => requests.post("/Pages", page),
  update: (page: IPage) => requests.put(`/Pages/${page.Id}`, page),
  delete: (id: string) =>
    requests.del(`/Pages/${id}`).then(sleep(400)).then(responseBody),
};

export default {
  Activities,
  User,
  Profiles,
  PageItemCategory,
  PageItem,
};
