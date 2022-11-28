import { BigNumber } from '@ethersproject/bignumber';

/**
 * Reduces string length by replacing a portion with a separator.
 *
 * Default is 8 chars + "..." + 4 chars.
 *
 * @param {object} opts
 * @param {string} opts.value
 * @param {number} opts.left length of the string before the separator
 * @param {number} opts.right length of the string after the separator
 * @param {string} opts.separator
 *
 * @return {string}
 */
export const reduceString = ({ value, left = 8, right = 4, separator = '...' }) => {
  if (typeof value !== 'string') throw new Error('reduceString: value is not a string.');
  if (left < 0 || right < 0) throw new Error('reduceString: left and right must be positive integers.');

  if (left + right >= value.length) return value;
  if (left + right === 0) return separator;

  const start = value.substring(0, left);
  const end = value.substring(value.length - right, value.length);

  return end ? (start ? start + separator + end : separator + end) : start + separator;
};

/**
 *
 * On one hand, Javascript does not handle floating point numbers correctly.
 * On the other hand, crypto-currencies usually deal with high precision numbers.
 * To solve this, big numbers libraries are used.
 * Those libraries allow to represent very long INTEGERS. As a consequence, a currency is represented by its smallest
 * possible unit. For example, Ethereum gas can be handled by big numbers using the GWEI unit, which is 10^-18 ETH.
 * However, we sometimes want to display an amount in the base unit (ETH for example). And this leads to issues,
 * especially with ethersJS lirary because it only includes a few operations (for performance purposes). Main issues are:
 *   * we cannot display a foating point number using a big number instance directly
 *   * we cannot easily round a big number to n decimals
 *
 * This function receives an ethersJS big number, then divides it by a power of 10 according to the proportion
 * between starting unit and target unit (gwei to eth => proportion = 18), then rounds the result according to
 * the precision required, and returns it as a string.
 * @param {object} opts
 * @param {BigNumber} opts.value
 * @param {number} opts.proportion proportion is the scale between units. Ex: from gwei to ether, the proportion is 18. Default proportion is 18.
 * @param {number} opts.precision the number of decimals (last one is rounded). Default precision is 5.
 * @return {string}
 */
export const bnToFloatString = ({ value, proportion = 18, precision = 5 }) => {
  // keep record of negative value or not
  value = BigNumber.from(value);
  const isNeg = value.isNegative();
  // and then safely work with absolute value
  value = value.abs();
  // find entire part (left to point) and decimal part (right to point)
  const divider = BigNumber.from('1' + Array(proportion).fill('0').join(''));
  const entire = value.div(divider);
  const decimal = value.sub(entire.mul(divider));

  // case where decimal part is 0 => returns entire part and the expected number of decimal according to precision
  if (decimal.eq(0)) {
    if (precision === 0) return (isNeg ? '-' : '') + entire.toString();
    return (isNeg ? '-' : '') + entire.toString() + '.' + Array(precision).fill('0').join('');
  }

  // for next steps, we need to use the string representation of the decimal part
  const decimalStr = decimal.toString();
  // case where there are less/equal decimals than the expected precision: nothing to round, but need to padd 0 at the end
  if (decimalStr.length <= precision)
    return (isNeg ? '-' : '') + entire.toString() + '.' + decimalStr.padEnd(precision, '0');

  // case where decimal part is longer than precision => round the decimal part
  const keep = decimalStr.substring(0, precision - 1);
  const toBeRounded = decimalStr.substring(precision - 1, precision + 1);
  const rounded = Math.round(parseInt(toBeRounded) / 10);
  return (isNeg ? '-' : '') + entire.toString() + '.' + keep + rounded;
};
