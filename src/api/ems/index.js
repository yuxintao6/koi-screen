import request from '@/utils/request'

// 获取现在EMS最新数据
export function getCurrentData() {
  return request({
    url: '/ems/chart/getCurrentData',
    method: 'get'
  })
}

// 获取储能可视化大屏接口现在最新数据
export function getCurrentDataByStorage() {
  return request({
    url: '/ems/chart/getCurrentDataByStorage',
    method: 'get'
  })
}

// 近30天模块故障
export function getModuleData() {
  return request({
    url: '/ems/chart/getModuleData',
    method: 'get'
  })
}

// 近30日排行榜
export function getSignData() {
  return request({
    url: '/ems/chart/getSignData',
    method: 'get'
  })
}

// 12小时-电池侧电压、侧电流、侧功率变化折线图
export function get24HoursData1() {
  return request({
    url: '/ems/chart/get24HoursData1',
    method: 'get'
  })
}

// 12小时-母线电压、电流、功率变化折线图
export function get24HoursData2() {
  return request({
    url: '/ems/chart/get24HoursData2',
    method: 'get'
  })
}

// 12小时-母线电压、电流、功率变化折线图
export function get24HoursData3() {
  return request({
    url: '/ems/chart/get24HoursData3',
    method: 'get'
  })
}