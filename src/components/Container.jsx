import { css } from '@emotion/react';

const containerStyle = css`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export default function Container({ children }) {
  return <div css={containerStyle}>{children}</div>;
} 