export const betterSize = size => {
  if (!Number.isInteger(size)) throw new Error('size is not a number');
  if (size < 1024)
    return {
      size,
      unit: 'octets',
    };

  if (size < 1024 * 1024)
    return {
      size: Math.round((size / 1024) * 100) / 100,
      unit: 'Ko',
    };

  if (size < 1024 * 1024 * 1024)
    return {
      size: Math.round((size / (1024 * 1024)) * 100) / 100,
      unit: 'Mo',
    };

  return {
    size: Math.round((size / (1024 * 1024 * 1024)) * 100) / 100,
    unit: 'Go',
  };
};

export const betterSizeToString = s => {
  const { size, unit } = betterSize(s);
  return `${size} ${unit}`;
};
