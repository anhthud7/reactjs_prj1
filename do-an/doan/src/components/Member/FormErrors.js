import React from 'react';

function FormErrors({ errors }) {
    if (Object.keys(errors).length > 0) {
        return (
            <ul className="alert alert-danger">
                {Object.keys(errors).map((key, index) => (
                    <li key={index}>• {errors[key]}</li>
                ))}
            </ul>
        );
    }
    return null;
}

export default FormErrors;