import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {color} from '../../../env.json'
import { useNavigate } from 'react-router-dom'
import { Padding } from '@mui/icons-material'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function index() {
	const navigate = useNavigate()
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		})
		navigate('/home')
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Box sx={{ backgroundColor: color.preto, position: 'relative', flex: 1 }} item xs={12} sm={8} md={5} elevation={6} square>
					<Box
						sx={{
							my: 30,
							mx: 5,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							backgroundColor: color.principal,
							padding: 5,
							borderRadius: 5,
						}}>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
							<TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
							<TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
							<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
							<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Esqueceu a senha?
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Box>
			</Grid>
		</ThemeProvider>
	)
}

