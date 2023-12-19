import { useState } from "react";
import Login from "./views/Login";
import "./App.css";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";

function App() {
  const [count, setCount] = useState(0);

  function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;
