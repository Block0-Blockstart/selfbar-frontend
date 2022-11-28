import config from '../config';

import { request } from './axiosWrapper';

/**
 * @typedef {{ error: null; data: any; } | { error: { message: string; code: number; }; data: null; }} DataOrError
 */

/**
 * Notarizes a batch of hashes. Input must be an array of keccak256 hashes.
 */
export const notarize = async ({ hashes }) =>
  await request({ url: `${config.API}/item`, method: 'POST', data: { hashes } });

/**
 * Verify a single keccak256 hash.
 */
export const verify = async ({ hash }) => await request({ url: `${config.API}/item/verify/${hash}`, method: 'GET' });

/**
 * Transfer random amount.
 */
export const transferRandom = async () => await request({ url: `${config.API}/transfer/random`, method: 'POST' });

/**
 * Number of hashes by day, from given unix timestamp. Note: the timestamp will be used to find
 * the beginning of the day, so the result will include full days.
 */
export const getHashesByDayFrom = async unixTimestampStart =>
  await request({ url: `${config.API}/item/number-hashes-by-day/${unixTimestampStart}`, method: 'GET' });

/**
 * All hashes in given batch.
 */
export const getHashesByBatch = async batchId =>
  await request({ url: `${config.API}/item/hashes-by-batch/${batchId}`, method: 'GET' });

/**
 * Sum of amounts transfered since unixTimestampStart.
 * Result is a big number as string, in the smallest unit (ex: gwei).
 * Timestamp is used as-is for the starting point.
 */
export const getTransferSumFrom = async unixTimestampStart =>
  await request({ url: `${config.API}/transfer/sum/${unixTimestampStart}`, method: 'GET' });

/**
 * Get infos about last n batches notarized.
 */
export const getLastBatches = async n => await request({ url: `${config.API}/item/last-batches/${n}`, method: 'GET' });

/**
 * NOT USED, requires a pk in header
 */
export const findOne = async ({ id, privateKey }) =>
  await request({ url: `${config.API}/item//${id}`, method: 'GET', headers: { sbadm: privateKey } });

/**
 * NOT USED, requires a pk in header
 */
export const findAll = async ({ privateKey }) =>
  await request({ url: `${config.API}/item`, method: 'GET', headers: { sbadm: privateKey } });
