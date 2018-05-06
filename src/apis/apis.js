import axios from 'axios'

/**
 * 获得直播房间列表
 *
 * @returns {Promise<any>}
 */
export const getLive = function () {
  const url = '/api/live'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获得分类下的房间列表
 *
 * @returns {Promise<any>}
 */
export const getLiveByType = function (type, offset = 0, limit = 30) {
  const url = `/api/live/${type}?offset=${offset}&limit=${limit}`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 首页
 *
 * @returns {Promise<any>}
 */
export const getHomePage = function () {
  const url = '/home'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获得标签分类
 *
 * @returns {Promise<any>}
 */
export const getCategory = function () {
  const url = '/category'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获得房间信息
 *
 * @returns {Promise<any>}
 */
export const getRoomInfo = function (roomId) {
  const url = `/room/${roomId}`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export const ERROR_OK = 0
