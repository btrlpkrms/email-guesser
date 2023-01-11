import React, {useState} from 'react';
import axios from 'axios';
import {Form} from "../component/Form";
import {Result} from "../component/Result";
import {Loading} from "../component/Loading";
import "./MainPageContainer.scss"

interface FormData {
    fullName: string;
    companyDomain: string;
}

interface EmailResponse {
    email: string;
}

export const MainPageContainer = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFormSubmit = async (formData: FormData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<EmailResponse>("http://localhost:3001/guess-email", {
                params: formData
            });
            setEmail(res.data.email);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={"main-page"}>
            <h1>Email Guesser</h1>
            <Form onSubmit={handleFormSubmit}/>
            <Loading isLoading={loading}/>
            <Result email={email} error={error} isLoading={loading}/>
        </div>
    );
};