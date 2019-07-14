/* tslint:disable */
/**
*/
export class State {
  free(): void;
/**
* @returns {State} 
*/
  static new(): State;
/**
* @param {number} year_min 
* @param {number} year_max 
* @returns {void} 
*/
  set_year_range(year_min: number, year_max: number): void;
/**
* @param {string} mode 
* @returns {void} 
*/
  set_mode(mode: string): void;
/**
* @param {number} last 
* @returns {void} 
*/
  set_last(last: number): void;
/**
* @param {number} new_x 
* @param {number} new_y 
* @returns {void} 
*/
  add_point(new_x: number, new_y: number): void;
/**
* @returns {void} 
*/
  reset_progress(): void;
/**
* @returns {void} 
*/
  draw_dist(): void;
/**
* @param {number} n 
* @returns {void} 
*/
  set_num_samples(n: number): void;
/**
* @param {number} min 
* @param {number} q 
* @returns {void} 
*/
  set_pareto(min: number, q: number): void;
/**
* @param {number} min 
* @returns {void} 
*/
  set_pareto_uniform(min: number): void;
/**
* @param {number} min 
* @param {number} alpha 
* @param {number} beta 
* @returns {void} 
*/
  set_pareto_beta(min: number, alpha: number, beta: number): void;
/**
* @returns {void} 
*/
  draw_insights(): void;
/**
* @returns {void} 
*/
  draw_timeline(): void;
}

/**
* If `module_or_path` is {RequestInfo}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {RequestInfo | BufferSource | WebAssembly.Module} module_or_path
*
* @returns {Promise<any>}
*/
export default function init (module_or_path: RequestInfo | BufferSource | WebAssembly.Module): Promise<any>;
        