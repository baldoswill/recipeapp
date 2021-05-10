import React from 'react'

export default function AuthLayout(props) {
    return (
        <div className="login-container">
            {props.children}
        </div>
    )
}
