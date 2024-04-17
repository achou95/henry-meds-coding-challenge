import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { fakeAuthProvider } from "./auth";
import ErrorPage from "./error-page";
import ClientPage from "./routes/client";
import { getClient, getProvider } from "./data";
import { Box, Button, Container, TextField } from "@mui/material";
import ProviderPage from "./routes/provider";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/client"
            element={
              <RequireAuth>
                <ClientPage />
              </RequireAuth>
            }
          />
          <Route
            path="/provider"
            element={
              <RequireAuth>
                <ProviderPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  let navigate = useNavigate();
  let auth = useAuth();
  return (
    <Container>
      <Box sx={{ 
          my: 1,
          borderBottom: 1,
          borderColor: 'divider',
          '& > :not(style) ~ :not(style)': {
            ml: 2,
          }
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/client"
          onClick={() => {
            auth.signout(() => navigate("/client"));
          }}
        >
          Client Page
        </Link>        
        <Link to="/provider"
          onClick={() => {
            auth.signout(() => navigate("/provider"));
          }}
        >
          Provider Page
        </Link>
      </Box>
      <AuthStatus />
      <h1>Reservation App</h1>
      <Outlet />
    </Container>
  );
}

interface AuthContextType {
  user: any;
  signin: (user: number, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<number>();

  let signin = (newUser: number, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(0);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <Box>You are not logged in.</Box>;
  }

  let user = getClient(auth.user) || getProvider(auth.user)
  return (
    <Box>
      Welcome {user && user.name}!{" "}
      <Button
        variant="outlined"
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </Button>
    </Box>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    const client = !!username ? getClient(parseInt(username)) : undefined
    const provider = !!username ? getProvider(parseInt(username)) : undefined

    if (from === "/client" && !!client) {
      auth.signin(client.id, () => {
        // Sends user to client page
        navigate(from, { replace: true });
      })
    } else if (from === "/provider" && !!provider) {
      auth.signin(provider.id, () => {
        // Sends user to provider page
        navigate(from, { replace: true });
      })
    } else {
      alert('Invalid username')
      throw new Error('Invalid username')
    }
  }

  return (
    <div>
      <p>You must log in to view the {from.replace('/', '')} page</p>

      <form onSubmit={handleSubmit}>
        <TextField label="User ID" size="small" name="username" type="text" sx={{mr: 2}}/>
        <Button variant="outlined" type="submit">Login</Button>
      </form>
    </div>
  );
}

function HomePage() {
  let navigate = useNavigate();

  return (
    <>
      <h2>Welcome to the reservation app!</h2>
      <Button
        variant="outlined"
        sx={{ mr: 1 }}
        onClick={() => {
          navigate("/client");
        }}
      >
        Client
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/provider");
        }}
      >
        Provider
      </Button>
    </>
  )
}
