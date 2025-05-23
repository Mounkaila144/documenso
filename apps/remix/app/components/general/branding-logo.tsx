import type { SVGAttributes } from 'react';

export type LogoProps = SVGAttributes<SVGSVGElement>;

export const BrandingLogo = ({ ...props }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 347.66 82.11"
      {...props}
    >
      <defs>
        <style>
          {`.cls-1,.cls-2,.cls-3,.cls-4,.cls-6{isolation:isolate;}
          .cls-2,.cls-3,.cls-4,.cls-6{font-size:72px;font-family:FranklinGothic-Medium, Franklin Gothic Medium;font-weight:500;letter-spacing:0.04em;}
          .cls-2{fill:hsl(95.08deg 71.42% 43.5%);}
          .cls-4,.cls-5{fill:hsl(0deg 81.99% 58.63%);}
          .cls-6{fill:hsl(95.08deg 71.42% 43.5%);font-size:32px;}`}
        </style>
      </defs>
      <g className="cls-1">
        <text className="cls-2" transform="translate(0 60.03)">i Call</text>
        <text className="cls-3" transform="translate(167 60.03)"></text>
        <text className="cls-4" transform="translate(187.6 60.03)">26</text>
        <text className="cls-6" transform="translate(280 60.03)">Sign</text>
      </g>
      <path
        className="cls-5"
        d="M46.43,53.07A32.77,32.77,0,0,1,44,43.59c-.41-4,.17-5.63-.75-6.36C41,35.44,31.92,40.78,31,48c-.87,6.49,5.1,11.86,10.32,16.56,3.83,3.44,13.16,11.84,23.47,10,4.11-.74,6-2.69,10.32-1.8s5.15,3.28,9.66,3.37c2.4,0,4.28-.59,7.33-1.63,2.7-1,4.07-1.44,4.34-2.56.48-2.07-3-4.71-4.52-5.82A14.61,14.61,0,0,0,85.47,63c-4.2-.65-6.5,1.8-10.81,3.63-1,.42-11.39,4.66-19.3,0C50,63.45,47.54,57.22,46.43,53.07Z"
      />
    </svg>
  );
};
