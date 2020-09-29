/* eslint-disable require-jsdoc */
import request from "@/utils/request";
export function getMenuData() {
  return request({
    url: "/api/menu",
    method: "get",
  });
}