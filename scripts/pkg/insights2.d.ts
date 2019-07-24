/* tslint:disable */
/**
* The state of the insights demo.
*/
export class State {
  free(): void;
/**
* @returns {State} 
*/
  static new(): State;
/**
* Sets time interval for insights.
*
* # Arguments
*
* - `year_min: i16` - The lower bound of the interval.
* - `year_max: i16` - The upper bound of the interval.
* @param {number} year_min 
* @param {number} year_max 
* @returns {void} 
*/
  set_year_range(year_min: number, year_max: number): void;
/**
* Sets the regression mode for curve fitting.
*
* # Argument
*
* - `mode: &str` - String representation of mode.
* @param {string} mode 
* @returns {void} 
*/
  set_mode(mode: string): void;
/**
* Sets upper bound for the last year in the projection.
*
* # Argument
*
* - `last: i32` - Upper bound for the last year in the projection.
* @param {number} last 
* @returns {void} 
*/
  set_last(last: number): void;
/**
* Adds a point to the progress distribution.
*
* # Arguments
*
* - `new_x: f32` - The x-coordinate of the point to be added, i.e., the proportion of required
* insights that have been discovered.
* - `new_y: f32` - The y-coordinate of the point to be added, i.e., the probability the the process
* is no more than this much of the way done.
* @param {number} new_x 
* @param {number} new_y 
* @returns {void} 
*/
  add_point(new_x: number, new_y: number): void;
/**
* Resets progress distribution to initial values.
* @returns {void} 
*/
  reset_progress(): void;
/**
* Draws the progress distribution to a canvas.
* @returns {void} 
*/
  draw_dist(): void;
/**
* Sets the number of samples to take from the progression distribution.
* @param {number} n 
* @returns {void} 
*/
  set_num_samples(n: number): void;
/**
* Sets the distribution to a Pareto with the chosen parameters.
*
* # Arguments
* - `min: u32` - The minimum plausible number of insights.
* - `q: f32` - The `q` parameter for the Pareto.
* @param {number} min 
* @param {number} q 
* @returns {void} 
*/
  set_pareto(min: number, q: number): void;
/**
* Sets the distribution to a mixture of Paretos where the `q` parameters are sampled from a
* uniformly from [0.001, 1).
*
* # Arguments
* - `min: u32` - The minimum plausible number of insights.
* @param {number} min 
* @returns {void} 
*/
  set_pareto_uniform(min: number): void;
/**
* Sets the distribution to a mixture of Paretos where the `q` parameters are sampled from a
* Beta distribution parameterized by `alpha` and `beta`.
* @param {number} min 
* @param {number} alpha 
* @param {number} beta 
* @returns {void} 
*/
  set_pareto_beta(min: number, alpha: number, beta: number): void;
/**
* Draws the insights plot.
* @returns {void} 
*/
  draw_insights(): void;
/**
* Draws the tinmeline plot.
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
        