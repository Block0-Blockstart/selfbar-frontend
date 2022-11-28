import PropTypes from 'prop-types';

import { MenuItem, Select } from '@mui/material';

export const DropList = ({ items, value, setValue, disabled }) => {
  const handleChange = e => setValue(e.target.value);

  return (
    <Select disabled={disabled} size="small" sx={{ backgroundColor: 'white' }} value={value} onChange={handleChange}>
      {items.map(i => (
        <MenuItem key={i.id} value={i.value}>
          {i.label}
        </MenuItem>
      ))}
    </Select>
  );
};

DropList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  value: PropTypes.string,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
};
