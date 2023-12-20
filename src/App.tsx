import { CssBaseline } from "@mui/material";
import Login from "./views/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
	const rootElement = document.getElementById('root')

  const theme = createTheme({
		components: {
			MuiPopover: {
				defaultProps: {
					container: rootElement,
				},
			},
			MuiPopper: {
				defaultProps: {
					container: rootElement,
				},
			},
		},
  })

  return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Login />
		</ThemeProvider>
  )
}

export default App;
