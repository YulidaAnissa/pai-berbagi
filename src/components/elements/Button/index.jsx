// import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export function Button({
  as,
  children = '',
  color = 'primary',
  fullWidth = false,
  className = '',
  variant = 'solid',
  // loading = false,
  size = 'medium',
  disabled = false,
  ...buttonProps
}) {
  const Component = as || 'button';
  const classes = clsx(
    className,
    'flex items-center justify-center rounded-lg',
    {
      'h-10 md:h-12': size === 'medium' && variant !== 'icon',
      'h-9 text-sm': size === 'small' && variant !== 'icon',
      'px-6': size === 'medium' && !className.includes('px-') && variant !== 'icon',
      'px-2': size === 'small' && !className.includes('px-') && variant !== 'icon',
      'w-full': fullWidth,
      'text-white': variant === 'solid',
      'bg-primary': !disabled && variant === 'solid' && color === 'primary',
      'bg-black-400 text-white': (disabled || color === 'disabled') && variant === 'solid',
      'border': variant === 'ghost',
      'text-primary': !disabled && variant === 'ghost' && color === 'primary',
      'text-black-900': !disabled && variant === 'ghost' && color === 'black',
      'text-black-400': (disabled || color === 'disabled') && variant === 'ghost',
      'bg-aqua-deep': !disabled && variant === 'solid' && color === 'aqua-deep',
      'bg-mysooltan': !disabled && variant === 'solid' && color === 'mysooltan',
      'bg-black-200': !disabled && color === 'inactive',
    }
  );


  return (
    <Component className={classes} disabled={disabled} {...buttonProps}>
      {/* {loading ? (
        <LoadingIcon fill={variant === 'solid' ? 'white' : 'currentColor'} />
      ) : ( */}
        {children}
      {/* )} */}
    </Component>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  tile: PropTypes.bool,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  type: PropTypes.string,
  variant: PropTypes.oneOf(['solid', 'ghost', 'icon', 'text']),
};

export default Button;