import React from 'react';
import {
    render,
    fireEvent,
    waitFor,
    screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import {MainPageContainer} from "../container/MainPage/MainPageContainer";

jest.mock('axios');

describe('MainPageContainer', () => {

    it('should render the form with the correct initial values', () => {
        render(<MainPageContainer/>);
        const fullNameInput = screen.getByTestId('fullName');
        const companyDomainInput = screen.getByTestId('companyDomain');

        expect(fullNameInput.textContent).toBe('Full Name:');
        expect(companyDomainInput.textContent).toBe('Company:');
    });

    it('should show loading spinner when form is submitted', async () => {
        render(<MainPageContainer/>);
        const fullNameInput = screen.getByTestId('fullName-input');
        const companyDomainInput = screen.getByTestId('companyDomain-input');
        const submitButton = screen.getByTestId('submit-button');

        fireEvent.change(fullNameInput, {target: {value: 'John Doe'}});
        fireEvent.change(companyDomainInput, {target: {value: 'Babbel'}});
        fireEvent.submit(submitButton);

        expect(screen.getByTestId('loading-spinner')).toBeTruthy();
    });

    it('should display the email when the API call is successful', async () => {
        render(<MainPageContainer/>);
        const fullNameInput = await screen.findByTestId('fullName-input');
        const companyDomainInput = await screen.findByTestId('companyDomain-input');
        const submitButton = await screen.findByTestId('submit-button');

        (axios.get as jest.Mock).mockResolvedValue({
            data: {email: 'jdoe@babbel.com'},
        });
        fireEvent.change(fullNameInput, {target: {value: 'John Doe'}});
        fireEvent.change(companyDomainInput, {target: {value: 'Babbel'}});
        fireEvent.submit(submitButton);

        await waitFor(() => {
            expect(screen.getByTestId('email-result')).toHaveTextContent('Guessed Email: jdoe@babbel.com');
        });
    });

    it('should display an error message when the API call fails', async () => {
        render(<MainPageContainer/>);

        const fullNameInput = screen.getByTestId('fullName-input');
        const companyDomainInput = screen.getByTestId('companyDomain-input');
        const submitButton = screen.getByTestId('submit-button');

        (axios.get as jest.Mock).mockRejectedValue(new Error('Error message'));

        fireEvent.change(fullNameInput, {target: {value: 'John Doe'}});
        fireEvent.change(companyDomainInput, {target: {value: 'Babbel'}});
        fireEvent.submit(submitButton);


        await waitFor(() => {
            expect(screen.getByTestId('error-result')).toHaveTextContent('Error: Error message');
        });
    });
});

