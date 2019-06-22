import css from 'styled-jsx/css';

const styles = css.global`
@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind screens;
body {
  @apply bg-gray-100;
}
`;

export default styles;
