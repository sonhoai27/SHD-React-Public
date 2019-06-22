import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import css from 'styled-jsx/css';

import styles from '@app/shares/global/styles';
import './styles.scss';

const a = css
` .header {
  @apply text-yellow-500;
}
`

const Index = () => {
  return (
    <React.Fragment>
      <div className="header">AAAA</div>
      <style jsx global>{styles}</style>
      <style jsx>{a}</style>
    </React.Fragment>
  );
};

render(
    <AppContainer>
        <Index />
    </AppContainer>,
    document.getElementById('root'),
);
