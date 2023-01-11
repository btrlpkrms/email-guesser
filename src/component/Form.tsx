import React, {useState} from 'react';
import "./Form.scss";

interface FormProps {
    onSubmit: (event: { fullName: string; companyDomain: string }) => void;
}

export const Form = (props: FormProps) => {
    const [formData, setFormData] = useState({fullName: '', companyDomain: ''});
    const [formValid, setFormValid] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit(formData);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if (/^[A-Za-z ]+$/.test(value) || value === "") {
            setFormData((prev) => ({...prev, [name]: value}));
        } else {
            alert("only english alphabetical characters allowed");
        }
        if (formData.fullName !== "" && formData.companyDomain !== "") {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
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
            <button type="submit" disabled={!formValid}>Guess Email</button>
        </form>
    );
};