/* eslint-disable require-jsdoc */
import Cookies from 'js-cookie'


export function getCookies(key) {
  return Cookies.get(key)
}

export function setCookies(key, data) {
  return Cookies.set(key, data)
}

export function removeCookies(key) {
  return Cookies.remove(key)
}