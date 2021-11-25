import React ,{useState} from 'react';
import {
  Link,
  Routes,
  Route
} from 'react-router-dom'

const Home = () => <h1>Home</h1>;
const Profile = () => <h1>Profile</h1>;
const Settings = () => <h1>Settings</h1>;
const routes = [
  {
    path: "/",
    main: () => <Home />,
    sidebar: () => (
      <p>
        This is your home page. You'll see your feed which is made up of the
        people you follow.
      </p>
    )
  },
  {
    path: "/profile",
    main: () => <Profile />,
    sidebar: () => (
      <p>
        This is your profile page. You'll be able to see all your profile
        information as well as the people you follow.
      </p>
    )
  },
  {
    path: "/settings",
    main: () => <Settings />,
    sidebar: () => (
      <p>
        This is your settings page. You can change your name, image, and
        anything else associated with your account.
      </p>
    )
  }
];

export function NewSideBar() {
  return (
    <div >
      <div className="sidebar">
        <ul >
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>

        <Routes>
          {routes.map(({ path, sidebar }) => (
            <Route
              key={path}
              path={path}
              element={sidebar()}
            />
          ))}
        </Routes>
      </div>

      <Routes>
        {routes.map(({ path, main }) => (
          <Route
            key={path}
            path={path}
            element={main()}
          />
        ))}
      </Routes>
    </div>
  );
}