import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from '@app/App';
import 'antd/dist/reset.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element with id="root" not found');
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  container
);
