import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Input from '@mui/material/Input'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { color, ministerio } from '../../../env.json'
import { useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { Fragment, useEffect, useState } from 'react'
import { auth, db, collection, getDocs, doc, updateDoc } from '../../service/firebase'
import { Alert, TextField } from '@mui/material'


export default function index() {
	const navigate = useNavigate()
	const [Saldo, setSaldo] = useState()
	const [Carregou, setCarregou] = useState(false)
	const [Transferir, setTransferir] = useState()
	const [Open, setOpen] = useState(false)


	const enviar = async () => {
		const resultado = Saldo - parseInt(Transferir)
		if (resultado < 0 || isNaN(Number(Transferir))) {
			alert('Valor inválido ou Saldo insuficiente')
		} else {
			let id

			const docRef = updateDoc(doc(db, ministerio, id), {
				saldo: resultado,
			})
				.then(() => {
					setOpen(true)
					setTransferir(null)
				})
				.catch(() => alert('Erro na atualização'))
		}
	}

	const pegaDados = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, ministerio))
			querySnapshot.forEach((doc) => {
				if (doc.data().uid === auth.currentUser?.uid) {
					setSaldo(doc.data().saldo)
					setCarregou(true)
				}
			})
		} catch (error) {
			console.error('Erro ao obter dados:', error)
		}
	}

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	useEffect(() => {
		const fetchData = async () => {
			await pegaDados()
		}

		fetchData()
	}, [Saldo])

	useEffect(() => {
		const email = localStorage.getItem('email')
		const senha = localStorage.getItem('senha')
		if (!email && !senha) {
			navigate('/')
		}
	}, [])

	if (!Carregou) return

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Snackbar open={Open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					Solos Atualizados
				</Alert>
			</Snackbar>
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
						gap: 3,
						justifyContent: 'start',
					}}>
					<Typography sx={{ color: color.preto }} fontWeight="bold" component="h1" variant="h3">
						Transferência
					</Typography>

					<Typography sx={{ color: color.amarelo_escuro, fontSize: 20 }}>Quantidade que Solo que quer tranferir.</Typography>
					<TextField sx={{ borderBlockColor: color.principal, borderBlockWidth: 20 }} margin="normal" required fullWidth label="Transferir" onChange={(e) => setTransferir(e.target.value)} />
					<Button onClick={enviar} type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: color.preto, color: color.branco, borderRadius: 3 }}>
						Enviar
					</Button>
				</Box>
			</Box>
		</Grid>
	)
}
