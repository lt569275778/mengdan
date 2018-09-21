import { fetch } from './fetch' // 引用fetch.js
import api from './url' // 引用url.js
// 查看用户
export function lookOption() { // lookOption是你要调用接口的名字，issuer,userId是传进来的参数
  return fetch({
    // api.Hallowmas 引用url.js里面的数据
    url: api.baseUrl + '/api/dc/user',
    method: 'get', // 请求方法
    params: {}
  })
}
// 获取项目列表
export function getsubject() {
  return fetch({
    url: api.baseUrl + '/api/dc/project',
    method: 'get', // 请求方法
    params: {}
  })
}
// 根据项目ID获取环境列表
export function projectid(ids) {
  return fetch({
    url: api.baseUrl + '/api/dc/env/' + ids,
    method: 'get' // 请求方法
  })
}
// 根据项目ID、环境ID获取平台列表
export function platformid(subid, envid) {
  return fetch({
    url: api.baseUrl + '/api/dc/platform/' + subid + '/' + envid,
    method: 'get' // 请求方法
  })
}
// 注销
export function logout() {
  return fetch({
    url: api.baseUrl + '/api/logout',
    method: 'delete' // 请求方法
  })
}
// 据项目、环境获取页面列表
export function getpage(projectID, envID) {
  return fetch({
    url: api.baseUrl + '/api/dc/page/' + projectID + '/' + envID,
    method: 'get' // 请求方法
  })
}
// 获取菜单栏
export function getmeunlist(projectID, envID, platformID) {
  return fetch({
    url: api.baseUrl + '/api/dc/menu/' + projectID + '/' + envID + '/' + platformID,
    method: 'get' // 请求方法
  })
}
// 根据项目、环境获取分组列表
export function gourplist(projectID, envID) {
  return fetch({
    url: api.baseUrl + '/api/dc/menu/' + projectID + '/' + envID,
    method: 'get' // 请求方法
  })
}
// 根据项目、环境添加分组
export function addmeunlist(projectID, envID, para) {
  return fetch({
    url: api.baseUrl + '/api/dc/menu/' + projectID + '/' + envID,
    method: 'post', // 请求方法,
    data: para
  })
}
// 根据分组ID修改分组
export function modifymenu(menuID, para) {
  return fetch({
    url: api.baseUrl + '/api/dc/menu/' + menuID,
    method: 'put', // 请求方法,
    data: para
  })
}
// 根据分组ID删除分组
export function deletemeun(menuID) {
  return fetch({
    url: api.baseUrl + '/api/dc/menu/' + menuID,
    method: 'delete' // 请求方法,
    // params:
  })
}
// 根据页面ID获取详情
export function getpageid(pageId) {
  return fetch({
    url: api.baseUrl + '/api/dc/page/' + pageId,
    method: 'get' // 请求方法,
  })
}
// 根据页面ID删除页面
export function deletepageid(pageId) {
  return fetch({
    url: api.baseUrl + '/api/dc/page/delete/' + pageId,
    method: 'post' // 请求方法,
  })
}
// 获取页面结构

