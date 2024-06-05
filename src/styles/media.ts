import { css, type CSSObject, type Interpolation } from 'styled-components';

export type Breakpoints = 'mobile' | 'tablet';

export const breakpoints: Record<Breakpoints, string> = {
  mobile: '@media (max-width: 768px)',
  tablet: '@media (max-width: 1200px)',
};

const media = Object.entries(breakpoints).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: Interpolation<String | Object>[]
    ) => css`
      ${value} {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {}) as Record<Breakpoints, any>;

export default media;
