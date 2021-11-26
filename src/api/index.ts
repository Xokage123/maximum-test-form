import axios from "axios";

import type { ICityInformation } from "@/store/types";

import { URL_CITY, URL_SUBMIT } from "@/const/const";

export const api_getCity = async (): Promise<Array<ICityInformation>> => {
  const answer = await axios({
    method: "GET",
    url: URL_CITY,
  });

  return answer.data;
};

export const api_submitForm = async (): Promise<any> => {
  try {
    const answer = await axios({
      method: "post",
      url: URL_SUBMIT,
    });
    return answer.data;
  } catch (er: any) {
    throw new Error(er.message);
  }
};
