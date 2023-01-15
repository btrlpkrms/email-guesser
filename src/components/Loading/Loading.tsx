import React from "react";
import "./Loading.scss";

interface LoadingProps {
    isLoading: boolean;
}

export const Loading = (props: LoadingProps) => {
    return (props.isLoading ?
        <div className={"loading"} data-testid={"loading-spinner"}><img width={30} height={30} src={"/loading-gif.gif"}
                                                                        alt={""}/></div> : null);
};