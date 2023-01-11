import React, { useState } from 'react';
import "./Form.scss";

interface FormProps {
    onSubmit: (event: { fullName: string; companyDomain: string }) => void;
}

export const Form = (props : FormProps) => {
    const [formData, setFormData] = useState({ fullName: '', companyDomain: '' });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit(formData);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form className={"form-container"} onSubmit={handleSubmit}>
            <label>
                <p>Full Name:</p>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                <p>Company Domain:</p>
                <input
                    type="text"
                    name="companyDomain"
                    value={formData.companyDomain}
                    onChange={handleInputChange}
                />
            </label>
            <button type="submit">Guess Email</button>
        </form>
    );
};