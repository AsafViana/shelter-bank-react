import { CssBaseline, Box, Grid, Typography, Button, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { color, ministerio } from '../../../env.json'
import { signOut, db, collection, getDocs, auth } from '../../service/firebase'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/ShelterBank.svg'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import QrCodeIcon from '@mui/icons-material/QrCode'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import '@fontsource/inter/200.css'
import '@fontsource/inter/900.css'
import '@fontsource/inter/400.css'

export default function index() {
	const navigate = useNavigate()
	const [Nome, setNome] = useState()
	const [Codigo, setCodigo] = useState()
	const [Saldo, setSaldo] = useState()
	const [Carregou, setCarregou] = useState(false)
	const [Dados, setDados] = useState<any>()

	function abreviarNome(nomeCompleto: string) {
		// Divide o nome completo em partes
		const partesDoNome = nomeCompleto.split(' ')

		// Verifica se há mais de um nome
		if (partesDoNome.length > 1) {
			// Abrevia os nomes do meio (exceto o primeiro e o último)
			for (let i = 1; i < partesDoNome.length - 1; i++) {
				partesDoNome[i] = partesDoNome[i].charAt(0) + '.'
			}
		}

		// Junta as partes do nome de volta
		const nomeAbreviado = partesDoNome.join(' ')

		return nomeAbreviado
	}

	function formatarStringComQuebraDeLinha(str: string, caracteresPorLinha: Number) {
		const regex = new RegExp(`.{1,${caracteresPorLinha}}`, 'g')
		const linhas = str.match(regex)

		if (linhas) {
			return linhas.join('\n')
		}

		return str
	}

	const pegaDados = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, ministerio))
			querySnapshot.forEach((doc) => {
				if (doc.data().uid === auth.currentUser?.uid) {
					setNome(doc.data().nome)
					setSaldo(doc.data().saldo)
					setCarregou(true)
					setDados(doc.data())
					setCodigo(doc.data().uid)
				}
			})
		} catch (error) {
			console.error('Erro ao obter dados:', error)
		}
	}

	const logout = () => {
		signOut(auth)
		localStorage.removeItem('email')
		localStorage.removeItem('senha')
		navigate('/')
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
		if (!email && !senha){
			navigate('/')
		}
	}, [])

	if (!Carregou) return

	return (
		<Box component="main" sx={{ height: '100vh', backgroundColor: color.principal, paddingX: 4, paddingTop: 5 }}>
			<CssBaseline />
			<Box display="flex" flexDirection="column" gap={4} width="100%">
				<Grid container component="div" sx={{ height: 'auto', justifyContent: 'space-between' }}>
					<img src={Logo} alt="Logo Shelter Bank" style={{ width: 70, alignSelf: 'center' }} />
					<MeetingRoomIcon onClick={logout} sx={{ fontSize: 60, color: color.preto, alignSelf: 'center', justifySelf: 'end' }} />
				</Grid>
				<Box bgcolor={color.preto} borderRadius="1rem" boxShadow={5} padding={3} height="auto">
					<Box component={'div'} flexDirection={'column'} display="flex" justifyContent="space-between" alignItems="flex-start" gap={4}>
						<Box>
							<Typography fontWeight={900} fontFamily="Inter" color={color.branco}>
								Nome:
							</Typography>
							<Typography fontWeight={200} fontFamily="Inter" color={color.branco} fontSize={23}>
								{Nome}
							</Typography>
						</Box>
						<Box>
							<Typography fontWeight={900} fontFamily="Inter" color={color.branco}>
								Código:
							</Typography>
							<Typography fontWeight={200} fontFamily="Inter" color={color.branco} fontSize={23}>
								{formatarStringComQuebraDeLinha(Codigo!, 23)}
							</Typography>
						</Box>
					</Box>
				</Box>
				<Box bgcolor={color.preto} borderRadius="1rem" boxShadow={5} padding={3} height="auto">
					<Box component={'div'} flexDirection={'column'} display="flex" justifyContent="space-between" alignItems="flex-start" gap={4}>
						<Box>
							<Typography fontWeight={900} fontFamily="Inter" color={color.branco}>
								Saldo disponivel:
							</Typography>
							<Box display={'flex'} component={'div'} flexDirection={'row'} alignItems={'baseline'} gap={1}>
								<Typography color={color.branco}>SC$</Typography>
								<Typography fontWeight={900} fontFamily="Inter" color={color.verde} fontSize={30}>
									{Saldo}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
				<Typography fontWeight={900} fontSize={20} fontFamily="Inter" color={color.preto}>
					Movimentos:
				</Typography>

				<Box display={'flex'} justifyContent={'space-around'}>
					<Box bgcolor={color.preto} borderRadius="1rem" boxShadow={5} padding={3} height="auto">
						<QrCodeIcon sx={{ fontSize: 60, color: color.principal }} />
					</Box>
					<Box onClick={() => navigate('transferencia')} bgcolor={color.preto} borderRadius="1rem" boxShadow={5} padding={3} height="auto">
						<CompareArrowsIcon sx={{ fontSize: 60, color: color.principal }} />
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
