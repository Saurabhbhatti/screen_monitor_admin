import { PropsWithChildren } from 'react';
import App from '../../App';
import './BlankLayout.css';

const BlankLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <App>
      <div className="blank-layout-container">
        {children}
      </div>
    </App>
  );
};

export default BlankLayout;
