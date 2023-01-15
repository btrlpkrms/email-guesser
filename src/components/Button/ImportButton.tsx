import React, {useState} from 'react';
import "./ImportButton.scss";

interface ImportButtonProps {
    onFileSubmitted: (jsonData: any) => void;
    response: string | null | undefined;
}

export const ImportButton = (props: ImportButtonProps) => {
    const [jsonData, setJsonData] = useState(null);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const file = event.target.files && event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target && e.target.result) {
                try {
                    const jsonData = JSON.parse(e.target.result as string);
                    setJsonData(jsonData);
                    setSubmitDisabled(false);
                    setIsLoading(false);
                } catch (error) {
                    setSubmitDisabled(true);
                    alert('Invalid JSON file: ' + error);
                }
            } else {
                setSubmitDisabled(true);
                alert('File should not be empty.');
            }
        };
        reader.onerror = (error) => {
            alert('Error reading file: ' + error);
        }
        reader.readAsText(file);
    };

    const onSubmit = () => {
        props.onFileSubmitted(jsonData);
    }

    const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const element = event.target as HTMLInputElement
        element.value = ''
    }

    return (
        <div className={"import-button"}>
            <input type="file" onChange={handleFileSelected} onClick={onInputClick} accept=".json"/>
            <div className={"submit-button"}>
                <button onClick={onSubmit} placeholder={"Submit File"} disabled={submitDisabled}>Submit File</button>
                {!isLoading && props.response && <div>{props.response}</div>}
            </div>
        </div>
    );
};
