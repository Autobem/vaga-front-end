import standard from '@/config/service/standard';
import Service from '@/services/Services';

/**
 * @typedef {Http}
 */
export default class Http extends Service {
  /**
   * @param {String} path
   * @param {Object} options
   * @param {Object} http
   */
  constructor(path, options = {}, http = null) {
    super(options);
    this.path = path;
    this.http = http || standard;
  }

  /**
   * @param {String} path
   * @param {Object} options
   */
  static build(path, options) {
    return new this(path, options);
  }

  /**
   * @returns {Object}
   */

  getHttp(){

    return this.http;
  }

  /**
   * @param {String} url
   * @returns {*|Promise<any>}
   */
  get(url) {
    return this.getHttp()
      .get(this.constructor.normalize(this.path, url))
      .then(this.constructor.then);
  }

  /**
   * @param {String} url
   * @param {Object} data
   * @returns {*|Promise<any>}
   */
  post(url, data) {
    return this.getHttp()
      .post(this.constructor.normalize(this.path, url), data)
      .then(this.constructor.then);
  }

  /**
   * @param {String} url
   * @param {Object} data
   * @returns {*|Promise<any>}
   */
  put(url, data) {
    return this.getHttp()
      .put(this.constructor.normalize(this.path, url), data)
      .then(this.constructor.then);
  }

  /**
   * @param {String} url
   * @param {Object} data
   * @returns {*|Promise<any>}
   */
  patch(url, data) {
    return this.getHttp()
      .patch(this.constructor.normalize(this.path, url), data)
      .then(this.constructor.then);
  }

  /**
   * @param {String} url
   * @returns {*|Promise<any>}
   */
  delete(url) {
    return this.getHttp()
      .delete(this.constructor.normalize(this.path, url))
      .then(this.constructor.then);
  }

  /**
   * @param {Object} response
   * @returns {Object}
   */
  static then(response) {
    if (!response.data) {
      return {};
    }
    if (typeof response.data === 'string') {
      return JSON.parse(response.data);
    }
    return response.data;
  }

  /**
   * @param {String} start
   * @param {String} end
   * @returns {String}
   */
  static normalize(start, end) {
    if(end.length > 0){
      if(end[0] != '?')
        return `${start}/${end}`.replace(/([^:]\/)\/+/g, '$1');
      else
        return `${start}${end}`.replace(/([^:]\/)\/+/g, '$1');
    }else{
      return `${start}`.replace(/([^:]\/)\/+/g, '$1');
    }
  }
}
