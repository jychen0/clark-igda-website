import React from "react";
import "../css/GenericHeader.css";

function GenericHeader({
                    title,
                    subtitle = null,
                    leftIcon = null,
                    rightIcon = null,
                    gradientColors = ["#8b0000", "#ff6600", "#8b0000"],
                }) {
    const gradient = `linear-gradient(90deg, ${gradientColors.join(", ")})`;

    return (
        <header
            className="header-section text-center text-white py-5"
            style={{ background: gradient }}
        >
            <div className="container">
                <div className="d-flex justify-content-center align-items-center mb-2 flex-wrap">
                    {leftIcon && (
                        <span className="header-icon me-2 d-flex align-items-center">
              {leftIcon}
            </span>
                    )}

                    <h1 className="header-title mb-0">{title}</h1>

                    {rightIcon && (
                        <span className="header-icon ms-2 d-flex align-items-center">
              {rightIcon}
            </span>
                    )}
                </div>

                {subtitle && <p className="header-subtitle mb-0">{subtitle}</p>}
            </div>
        </header>
    );
}

export default GenericHeader;
