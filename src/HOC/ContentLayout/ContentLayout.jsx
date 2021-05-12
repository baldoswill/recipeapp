import React from 'react'


export default function ContentLayout(props) {
    return (
        <div className="main-container">            
            {props.children}           
        </div>
    )
}
