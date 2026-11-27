import type { ComponentPropsWithRef } from 'react';
import { classNames } from './classNames';
import './Card.css';

export type CardProps = ComponentPropsWithRef<'div'> & {
  /** Superficie elevada (`surface-raised`) en lugar de `surface`. */
  raised?: boolean;
};

/**
 * Contenedor neutro (DEV-039). Es un `<div>`: la semántica (`section`, `article`, una región con
 * nombre) la decide quien lo usa, con un elemento envolvente o con atributos `role`/`aria-*`.
 */
export function Card({ raised = false, className, ...props }: CardProps) {
  return <div {...props} className={classNames('cc-card', raised && 'cc-card--raised', className)} />;
}
