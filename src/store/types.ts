export interface IAppStore {
  city: Array<ICityInformation>;
  theme: Array<string>;
}

export interface ICityInformation {
  id: "string";
  title: "string";
}
