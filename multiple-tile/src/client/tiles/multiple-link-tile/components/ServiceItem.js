import React from 'react';
import { HBlock, ImageBox, TextBox } from '@ombiel/cm-tile-sdk';
import PropTypes from 'prop-types';

const ServiceItem = ({ serviceName, imageSrc }) => {
  return (
    <HBlock>
      <ImageBox src={imageSrc} imageFit="cover" imagePosition="center" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
      <TextBox>{serviceName}</TextBox>
    </HBlock>
  );
};

ServiceItem.propTypes = {serviceName: PropTypes.string.isRequired, imageSrc: PropTypes.string.isRequired };

export default ServiceItem;


