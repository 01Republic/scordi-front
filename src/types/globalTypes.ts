import { FC, ReactNode } from 'react';

export interface WithChildren {
  children?: ReactNode;
}

export type FCWithChildren = FC<WithChildren>;
