import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { color } from '../../../env.json'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from '../../service/firebase'

export default function index() {
	const navigate = useNavigate()
	const [Email, setEmail] = useState('')
	const [Senha, setSenha] = useState('')
	const [Disable, setDisable] = useState(true)

	const handleSubmit = () => {
		if (!auth.currentUser?.uid && Email !== '' && Senha !== '') {
			signInWithEmailAndPassword(auth, Email, Senha)
				.then((userCredential) => {
					console.log('foi')
					localStorage.setItem('email', Email)
					localStorage.setItem('senha', Senha)
					if (userCredential.user.email === 'shelteradolescentes@gmail.com') {
						navigate('Adm')
					} else {
						navigate('Home')
					}
				})
				.catch((e) => {
					alert(e.message)
					alert('Senha ou e-mail errado')
					setDisable(true)
				})
		} else {
			alert('Preencha os campos corretamente')
			setDisable(true)
		}
	}

	const handleEsqueciSenha = () => {
		if (!!Email) {
			sendPasswordResetEmail(auth, Email)
			alert('Email para redefinir senha enviado')
		} else {
			alert('Digite o seu email')
		}
	}

	useEffect(() => {
		if (!!Email && !!Senha) {
			setDisable(false)
		}
	}, [Email, Senha])

	useEffect(() => {
		const email = localStorage.getItem('email')
		const senha = localStorage.getItem('senha')
		signOut(auth)

		console.log([email, senha])

		if (email !== '' && senha !== '') {
			signInWithEmailAndPassword(auth, email!, senha!).then((userCredential) => {
				console.log('foi')
				localStorage.setItem('email', email!)
				localStorage.setItem('senha', senha!)
				if (userCredential.user.email === 'shelteradolescentes@gmail.com') {
					navigate('Adm')
				} else {
					navigate('Home')
				}
			})
		}
	}, [])

	return (
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
					<Typography fontWeight="bold" component="h1" variant="h3">
						Login
					</Typography>
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<TextField value={Email} onChange={(e) => setEmail(e.target.value)} margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
						<TextField value={Senha} onChange={(e) => setSenha(e.target.value)} margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />

						<Button disabled={Disable} onClick={handleSubmit} type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: color.preto, color: color.branco, borderRadius: 3 }}>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Button onClick={handleEsqueciSenha} variant="text" sx={{ color: color.preto, fontWeight: 'bold' }}>
									Esqueceu a senha?
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Box>
		</Grid>
	)
}
