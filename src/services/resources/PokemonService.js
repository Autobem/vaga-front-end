import Rest from '@/services/Rest';

/**
 * @typedef {PokemonService}
 */
export default class PokemonService extends Rest {
  /**
   * @type {String}
   */
  static resource = 'pokemon'
}
