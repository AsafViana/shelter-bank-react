import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './views/Login'
import Home from './views/Home'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
	},
	{
		path: 'Home',
		element: <Home />,
	},
])

const defaultTheme = createTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.Fragment>
		<ThemeProvider theme={defaultTheme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.Fragment>
)
