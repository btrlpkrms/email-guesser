import React from "react";
import "./Loading.scss";

interface LoadingProps {
    isLoading: boolean;
}

export const Loading= ( props : LoadingProps ) => {
    return (props.isLoading ? <p className={"loading"}>Loading...</p> : null);
};