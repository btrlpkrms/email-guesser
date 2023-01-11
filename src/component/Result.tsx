import React from "react";
import "./Result.scss";

interface ResultsProps {
    email?: string | null;
    error?: string | null;
    isLoading: boolean;
}

export const Result= ( props : ResultsProps ) => {
    return (
        <>
            {props.error && <p className={"error"}>Error: {props.error}</p>}
            {!props.isLoading && props.email && <p className={"email"}>Guessed Email: {props.email}</p>}
        </>
    );
};