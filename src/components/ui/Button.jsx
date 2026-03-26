import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    to,
    href,
    fullWidth = false,
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
    className = '',
    ...props
}, ref) => {
    const classNames = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth && 'btn-full',
        disabled && 'btn-disabled',
        loading && 'btn-loading',
        icon && 'btn-with-icon',
        className
    ].filter(Boolean).join(' ');

    const content = (
        <>
            {loading && (
                <span className="btn-spinner">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                </span>
            )}
            {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
            <span className="btn-label">{children}</span>
            {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
        </>
    );

    if (to) {
        return (
            <Link ref={ref} to={to} className={classNames} {...props}>
                {content}
            </Link>
        );
    }

    if (href) {
        return (
            <a ref={ref} href={href} className={classNames} target="_blank" rel="noopener noreferrer" {...props}>
                {content}
            </a>
        );
    }

    return (
        <button ref={ref} className={classNames} disabled={disabled || loading} {...props}>
            {content}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
