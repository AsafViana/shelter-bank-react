import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Input from '@mui/material/Input'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { color } from '../../../env.json'
import { useNavigate } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

export default function index() {
	const navigate = useNavigate()

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Box sx={{ backgroundColor: color.principal, position: 'relative', flex: 1 }} item xs={12} sm={8} md={5} elevation={6} square>
				<Box
					sx={{
						my: 30,
						mx: 5,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						backgroundColor: color.preto,
						padding: 5,
						borderRadius: 5,
						gap: 3,
						justifyContent: 'start',
					}}>
					<Typography sx={{ color: color.principal }} fontWeight="bold" component="h1" variant="h3">
						Transferência
					</Typography>

					<Typography sx={{ color: color.branco, fontSize: 20 }}>Quantidade que Solo que quer tranferir.</Typography>

				</Box>
			</Box>
		</Grid>
	)
}
