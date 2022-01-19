import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Switch from 'react-switch';

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;

const StyledSpan = styled.span`
  padding: 10px;
  margin-left: auto;
`;

const CustomSwitch = ({ onChange, checked }) => (
  <StyledLabel>
    <StyledSpan>{`Show Only Confirmed Bookings`}</StyledSpan>
    <Switch
      onChange={onChange}
      checked={checked}
<<<<<<< HEAD
      onColor={'#212529'}
=======
      onColor={'#1b263b'}
>>>>>>> 36ccfb50b349fd49906ce0d749b6a00dc67a35c4
      uncheckedIcon={false}
      checkedIcon={false}
      height={32}
      width={64}
    />
  </StyledLabel>
);

CustomSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
}

export default CustomSwitch;
