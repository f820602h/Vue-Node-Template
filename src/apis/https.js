import axios from "axios";
import Qs from "qs";

const pending = new Map();

// 添加請求
const addPending = config => {
  const url = [config.method, config.url].join("&");
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pending.has(url)) pending.set(url, cancel);
    });
};

// 移除請求
const removePending = config => {
  const url = [config.method, config.url].join("&");
  if (pending.has(url)) {
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
  }
};

// 清空pending中的請求（路由跳轉時調用）
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
};

// 請求失敗的統一處理
const errorHandle = (status, message) => {
  switch (status) {
    case 404:
      // to 404;
      break;

    case 500:
      // to 500
      break;

    default:
      console.log(message);
  }
};

// axios 的實例
const instance = axios.create({
  baseURL: "apiUrl",
  headers: { "Content-Type": "application/json" },
  paramsSerializer: params => Qs.stringify(params, { arrayFormat: "repeat" }),
  withCredentials: true,
  crossDomain: true,
  timeout: 20000
});

// request 攔截器
instance.interceptors.request.use(
  config => {
    removePending(config);
    addPending(config);
    return config;
  },
  error => Promise.reject(error)
);

// response 攔截器
instance.interceptors.response.use(
  response => {
    removePending(response);
    return response;
  },
  error => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.error);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

// 封裝請求
export default function(method, url, data = null, config) {
  method = method.toLowerCase();
  switch (method) {
    case "post":
      return instance.post(url, data, config);
    case "get":
      return instance.get(url, { params: data });
    case "delete":
      return instance.delete(url, { params: data });
    case "put":
      return instance.put(url, data);
    case "patch":
      return instance.patch(url, data);
    default:
      console.log(`未知的 method: ${method}`);
      return false;
  }
}
