import Api from '@/services/API';

/**
 * @typedef {Rest}
 */
export default class Rest extends Api {
  /**
   * @type {String}
   */
  static resource = ''

  /**
   * @type {String}
   */
  id = 'id'

  /**
   * @param {String} resource
   * @param {Object} options
   * @param {Object} http
   */
  constructor(resource, options = {}, http = null) {
    super(Rest.normalize(Rest.base, resource), options, http);
  }

  /**
   * @return {this}
   */
  static build() {
    return new this(this.resource);
  }

  /**
   * @param {Object} record
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  create(record) {
    return this.post('', record);
  }

  /**
   * @param {String|Object} record
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  read(record) {
    return this.get(`/${this.getId(record)}`);
  }

  /**
   * @param {Object} record
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  update(record) {
    return this.post(`/${this.getId(record)}`, record);
  }

  /**
   * @param {Object} record
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  destroy(record) {
    return this.delete(`/${this.getId(record)}`);
  }

  /**
   * @param {Object} parameters
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  search(parameters = {}) {
    const queryString = Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');;
    // apply your logic here
    if(Object.keys(parameters).length)
      return this.get(`?${queryString}`);

    return this.get('');
  }

  /**
   * @param {String|Object} record
   * @returns {String}
   */
  getId(record) {
    if (typeof record === 'object') {
      return record[this.id] || record.get(this.id);
    }
    return String(record);
  }
}
