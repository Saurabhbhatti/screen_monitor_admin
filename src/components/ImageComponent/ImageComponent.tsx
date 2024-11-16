import React from 'react';
import { ImageComponentProps } from '../../utils/type';

const ImageComponent: React.FC<ImageComponentProps> = ({ onClick, children }) => {
  return <div onClick={onClick}>{children}</div>;
};

export default ImageComponent;
