import req from "@/apis/https";

export const apiTemplate = payload => {
  return req("get", "apiUrl", payload);
};
