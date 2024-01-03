import { useState, useEffect } from 'react'
import { color, ministerio } from '../../../env.json'
import { useNavigate } from 'react-router-dom'
import { db, collection, getDocs } from '../../service/firebase'
import { CssBaseline, Box, Typography, TextField, Button, Grid } from '@mui/material'
import '@fontsource/inter/200.css'
import '@fontsource/inter/900.css'
import '@fontsource/inter/400.css'

function index() {
	const navigate = useNavigate()
	const [Dados, setDados] = useState<any[]>()
	const [Erro, setErro] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [Nome, setNome] = useState('')
	const [Email, setEmail] = useState('')
	const [Codigo, setCodigo] = useState('')
	const [Saldo, setSaldo] = useState('')

	const pegaDados = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, ministerio))
			const dados: any[] = []
			querySnapshot.forEach((doc) => {
				if (doc.id !== 'adm') {
					dados.push({ ...doc.data(), id: doc.id })
				}
			})
			setDados(dados)
			console.log(dados)
		} catch (error) {
			console.error('Erro ao obter dados:', error)
			setErro(true)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			await pegaDados()
		}

		fetchData()
	}, [Dados])

	useEffect(() => {
		const email = localStorage.getItem('email')
		const senha = localStorage.getItem('senha')
		if (!email && !senha) {
			navigate('/')
		}
	}, [])

	if (!Dados) return

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
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
					<Typography fontWeight="bold" component="h1" variant="h3">
						Login
					</Typography>
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<TextField value={Nome} onChange={(e) => setNome(e.target.value)} margin="normal" required fullWidth label="Nome" />

						<TextField value={Email} onChange={(e) => setEmail(e.target.value)} margin="normal" required fullWidth label="Email" />

						<TextField margin="normal" required fullWidth label="" />

						<TextField value={Saldo} onChange={(e) => setSaldo(e.target.value)} margin="normal" required fullWidth label="" />

						<Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: color.preto, color: color.branco, borderRadius: 3 }}>
							Sign In
						</Button>
					</Box>
				</Box>
			</Box>
		</Grid>
	)
}

export default index
