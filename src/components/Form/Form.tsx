import React, {useEffect, useState} from 'react';
import "./Form.scss";


export interface FormElement {
    value: string,
    label: string,
    regex: RegExp
}

export interface FormProps {
    onSubmit: (event: { [key: string]: FormElement }) => void;
    initialFormData: { [key: string]: FormElement }
}

export const Form = (props: FormProps) => {
    const [formData, setFormData] = useState(props.initialFormData);
    const [formValid, setFormValid] = useState<boolean>(false);

    useEffect(() => {
        setFormValid(!Object.values(formData).some((value) => value.value === ''));
    }, [formData])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit(formData);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if (props.initialFormData[name].regex.test(value) || value === '') {
            setFormData((prev) => ({
                ...prev, [name]: {...formData[name], value}
            }));
        } else {
            alert("only english alphabetical characters allowed");
        }
    };

    return (
        <form className={"form-container"} onSubmit={handleSubmit}>
            {Object.entries(formData).map(([formElement, value]) =>
                <label key={formElement} data-testid={formElement}>
                    <p>{value.label}:</p>
                    <input
                        data-testid={formElement + "-input"}
                        type="text"
                        name={formElement}
                        value={value.value}
                        onChange={handleInputChange}
                    />
                </label>)}
            <button data-testid={"submit-button"} type="submit" disabled={!formValid}>Guess Email</button>
        </form>
    );
};