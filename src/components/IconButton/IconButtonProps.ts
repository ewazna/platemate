import type { ComponentPropsWithoutRef } from 'react';

export interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
    primary?: boolean,
    secondary?: boolean,
    basic?: boolean,
    error?: boolean,
    raised?: boolean,
    disabled?: boolean,
    loading?: boolean
}