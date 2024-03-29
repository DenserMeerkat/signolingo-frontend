import { SVGProps } from "react";

export interface ClassNameProp {
  className?: string;
}

export interface CharacterCardProp extends ClassNameProp {
  character: string;
  progress: number;
}

export type CharacterSvgProps = SVGProps<SVGSVGElement> & {
  character: string;
  size?: number;
};
