import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';

/**
 * Generate a random bytes32 hash
 */
export function createRandomHash() {
  const rnd = Math.random() * Math.random() + 'a';
  return keccak256(toUtf8Bytes(rnd));
}
