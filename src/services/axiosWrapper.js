import axios from 'axios';

/**
 * @typedef {{ error: null; data: any; responseHeaders: any | undefined } | { error: { message: string; code: number; }; data: null; }} DataOrError
 */

/**
 *
 * Simple Axios request with error management.
 * The request never fails but returns {data, error}.
 * Either data or error is always null.
 * Error is in the shape {message, code}.
 * Data may vary.
 * The config arg is a classic axios config.
 * Prevents passing credentials except if explicitly set in config.
 *
 * Note: if withResponseHeaders is true, the response headers are also returned WHEN there is no error.
 *
 * @return {Promise<DataOrError>}
 */
export const request = async (config, withResponseHeaders = false) => {
  try {
    const { data, headers } = await axios({ withCredentials: false, ...config });
    if (withResponseHeaders) return { error: null, data, responseHeaders: headers };
    return { error: null, data };
  } catch (e) {
    if (e.response) {
      if (e.response.status < 500) {
        return {
          error: { message: e.response.data.message || 'Unknown error', code: e.response.status },
          data: null,
        };
      } else {
        return { error: { message: 'API internal error', code: e.response.status }, data: null };
      }
    } else if (e.request) {
      // the request was made but no response was received. `e.request` is an instance of XMLHttpRequest
      console.error(e);
      return {
        error: { message: `Request to ${config.url} has failed without response.`, code: 0 },
        data: null,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(e);
      return {
        error: { message: `Request to ${config.url} has failed because of internal React error.`, code: 0 },
        data: null,
      };
    }
  }
};
