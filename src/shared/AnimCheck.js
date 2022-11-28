import PropTypes from 'prop-types';

import { Box, styled } from '@mui/material';

const AnimCheckStyle = styled(Box)`
  circle {
    stroke-dasharray: ${p => p.size + 110}; /* 216 */ /* 166 */
    stroke-dashoffset: ${p => p.size + 110}; /* 216 */ /* 166 */
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: ${p => p.color};
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  svg {
    width: ${p => p.size + 'px'}; /* 106px */ /* 56px */
    height: ${p => p.size + 'px'}; /* 106px */ /* 56px */
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    margin: 10% auto;
    box-shadow: ${p => `inset 0px 0px 0px ${p.color}`};
    animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
  }

  path {
    transform-origin: 50% 50%;
    stroke-dasharray: ${p => p.size - 8}; /* 98 */ /* 48 */
    stroke-dashoffset: ${p => p.size - 8}; /* 98 */ /* 48 */
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes scale {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }
  @keyframes fill {
    100% {
      /* inset 0px 0px 0px 80px #7ac142 */ /* inset 0px 0px 0px 30px #7ac142 */
      box-shadow: ${p => `inset 0px 0px 0px ${p.size - 26}px ${p.color}`};
    }
  }
`;

export const AnimCheck = ({ size, color }) => (
  <AnimCheckStyle size={size} color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle cx="26" cy="26" r="25" fill="none" />
      <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>
  </AnimCheckStyle>
);

AnimCheck.propTypes = { size: PropTypes.number, color: PropTypes.string };
AnimCheck.defaultProps = { size: 56, color: '#7ac142' };
