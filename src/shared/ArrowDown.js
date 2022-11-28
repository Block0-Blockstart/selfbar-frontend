import PropTypes from 'prop-types';

export const ArrowDown = ({ color, width, height }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
    <path fill={color} d="M639,393.3H361V532H85l414.4,458L915,532H639V393.3z" />
    <path fill={color} d="M360.9,288.1h278.3v69.6H360.9V288.1z" />
    <path fill={color} d="M361,219h278v34.3H361V219z" />
    <path fill={color} d="M361.3,149.3h277.3v34.3H361.3V149.3z" />
    <path fill={color} d="M361,79.7h278V114H361V79.7z" />
    <path fill={color} d="M361,10h278v34.8H361V10z" />
  </svg>
);

ArrowDown.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
