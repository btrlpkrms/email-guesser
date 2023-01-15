import React from "react";
import "./Result.scss";

interface ResultsProps {
    email?: string | null;
    error?: string | null;
    isLoading: boolean;
}

export const Result = (props: ResultsProps) => {
    return (
        <>
            {props.error && <div data-testid={"error-result"} className={"error"}>Error: {props.error}</div>}
            {!props.error && !props.isLoading && props.email &&
                <div data-testid={"email-result"} className={"email"}>Guessed Email: {props.email}</div>}
        </>
    );
};