import React, {useState} from 'react';
import axios from 'axios';
import {Form, FormElement} from "../../components/Form/Form";
import {Loading} from "../../components/Loading/Loading";
import "./MainPageContainer.scss"
import {Result} from "../../components/Result/Result";
import {ImportButton} from "../../components/Button/ImportButton";
import {COMPANY_NAME_REGEX, FULL_NAME_REGEX, GET_EMAIL_URL, SAMPLE_DATA_URL} from "../../constants/Constants";

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
    const [submitResponse, setSubmitResponse] = useState<string | null>(null);

    const handleFormSubmit = async (formData: { [key: string]: FormElement }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<EmailResponse>(GET_EMAIL_URL, {
                params: Object.entries(formData).reduce((previousValue: FormData, [key, struct]) => {
                    previousValue[key as keyof FormData] = struct.value;
                    return previousValue
                }, {} as FormData)
            });
            setEmail(res.data.email);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileSubmit = async (jsonData: any) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post<any>(SAMPLE_DATA_URL, jsonData)
            setSubmitResponse(res.data.message)
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={"main-page"}>
            <h1>Email Guesser</h1>
            <Form onSubmit={handleFormSubmit} initialFormData={{
                fullName: {value: '', label: 'Full Name', regex: FULL_NAME_REGEX},
                companyDomain: {value: '', label: 'Company', regex: COMPANY_NAME_REGEX}
            }}/>
            <ImportButton onFileSubmitted={handleFileSubmit}
                          response={error == null ? submitResponse : error}></ImportButton>
            <Result email={email} error={error} isLoading={loading}/>
            <Loading isLoading={loading}/>
        </div>
    );
};