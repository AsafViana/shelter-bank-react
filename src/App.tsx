import Login from "./views/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme()


  return (
    <ThemeProvider theme={defaultTheme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;
