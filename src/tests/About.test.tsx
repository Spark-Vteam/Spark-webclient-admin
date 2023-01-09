import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import About from '../components/About';

test('Navbar is displayed', () => {
  render(
    <HashRouter>
      <About />
    </HashRouter>,
  );
  const navBarLogOut = screen.getByText('Log out');
  expect(navBarLogOut).toBeInTheDocument();
});

test('About Spark heading is displayed', () => {
  render(
    <HashRouter>
      <About />
    </HashRouter>,
  );
  const heading = screen.getByText('About Spark');
  expect(heading).toBeInTheDocument();
});

test('About text is displayed', () => {
  render(
    <HashRouter>
      <About />
    </HashRouter>,
  );
  const aboutText = screen.getByText(
    'This is a project at Blekinge Institute of Technology in the course of web development in virtual teams. The project involves developing a system for the company Spark, which rents electric scooters in various cities in Sweden. The company operates in three cities and plans to expand to more in the future with the help of the new system being developed by the students. The system will handle the logistics of scooter rentals, including the availability of scooters, the location of each scooter, and the management of customer accounts.',
  );
  expect(aboutText).toBeInTheDocument();
});

test('Footer component is rendered', () => {
  render(
    <HashRouter>
      <About />
    </HashRouter>,
  );
  const footerCopywrite = screen.getByText('© Spark 2022');
  const footerAbout = screen.getByText('About');
  const footerPolicy = screen.getByText('Policy');
  expect(footerCopywrite).toBeInTheDocument();
  expect(footerAbout).toBeInTheDocument();
  expect(footerPolicy).toBeInTheDocument();
});
