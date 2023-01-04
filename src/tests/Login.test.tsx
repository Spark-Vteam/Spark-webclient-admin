import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import LoginForm from '../components/Login';


it('renders the login form', () => {
    render(
        <HashRouter>
            <LoginForm />
        </HashRouter>,
    );
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
});

// it('redirects to the protected page when login is successful', async () => {
//     const { container } = render(
//         <HashRouter>
//             <LoginForm />
//         </HashRouter>,
//     );
//     const usernameInput = screen.getByLabelText('Email:');
//     const passwordInput = screen.getByLabelText('Password:');
//     const loginButton = screen.getByText('Log in');

//     // Simulate form submission with valid credentials
//     await act(async () => {
//         fireEvent.change(usernameInput, { target: { value: 'test@example.com' } });
//         fireEvent.change(passwordInput, { target: { value: 'password' } });
//         fireEvent.click(loginButton);
//     });

//     // Check that the user was redirected to the protected page
//     expect(screen.getByText('Protected Page')).toBeInTheDocument();
// });

// it('displays an error message when login fails', async () => {
//     const { container } = render(
//         <HashRouter>
//             <LoginForm />
//         </HashRouter>,
//     );
//     const usernameInput = screen.getByLabelText('Email:');
//     const passwordInput = screen.getByLabelText('Password:');
//     const loginButton = screen.getByText('Log in');

//     // Simulate form submission with invalid credentials
//     await act(async () => {
//         fireEvent.change(usernameInput, { target: { value: 'invalid@example.com' } });
//         fireEvent.change(passwordInput, { target: { value: 'password' } });
//         fireEvent.click(loginButton);
//     });

//     // Check that the error message is displayed
//     expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
// });