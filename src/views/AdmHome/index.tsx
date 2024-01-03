import { useState, useEffect } from 'react';
import {color, ministerio} from '../../../env.json'
import { useNavigate } from 'react-router-dom'
import { db, collection, getDocs, auth, signOut } from '../../service/firebase'
import { CssBaseline, Box, Typography } from '@mui/material'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import AddIcon from '@mui/icons-material/Add'
import '@fontsource/inter/200.css'
import '@fontsource/inter/900.css'
import '@fontsource/inter/400.css'

function index() {
	const [Dados, setDados] = useState<any[]>()
	const [Carregou, setCarregou] = useState(false)
	const [Erro, setErro] = useState(false)
	const [showModal, setShowModal] = useState(false)

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
			setCarregou(true)
		} catch (error) {
			console.error('Erro ao obter dados:', error)
			setErro(true)
		}
	}


	const logout = () => {
		signOut(auth)
		localStorage.removeItem('email')
		localStorage.removeItem('senha')
		navigate('Login')
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
		<Box component="div" display="flex" flexDirection="column" gap={3} sx={{ height: '100vh', backgroundColor: color.principal, paddingX: 4, paddingTop: 5 }}>
			<CssBaseline />
			<Box display={'flex'} justifyContent={'space-around'}>
				<Box bgcolor={color.preto} borderRadius="1rem" boxShadow={5} padding={3} height="auto">
					<MeetingRoomIcon onClick={logout} sx={{ fontSize: 60, color: color.principal, alignSelf: 'center', justifySelf: 'end' }} />
				</Box>
				<Box onClick={() => navigate('AdmHome/AddAdolescentes')} bgcolor={color.preto} borderRadius="1rem" boxShadow={5} padding={3} height="auto">
					<AddIcon sx={{ fontSize: 60, color: color.principal }} />
				</Box>
			</Box>
			{Dados.map((obj) => (<Card dados={obj}/>))}
		</Box>
	)
}

const Card = ({dados}) => {
	const navigate = useNavigate()
	function abreviarNome(nomeCompleto: string) {
		// Divide o nome completo em partes
		if (!nomeCompleto) return

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

	function redirecionar(){
		localStorage.setItem('uid', dados.uid)
		navigate('DetalheAdolescentes')
	}

	return (
		<Box display="flex" flexDirection="column" gap={4} width="100%">
			<Box onClick={redirecionar} bgcolor={color.preto} borderRadius="1rem" boxShadow={5} padding={3} height="auto">
				<Box component={'div'} flexDirection={'column'} display="flex" justifyContent="space-between" alignItems="flex-start" gap={4}>
					<Box>
						<Typography fontWeight={900} fontFamily="Inter" color={color.branco}>
							Nome:
						</Typography>
						<Typography fontWeight={200} fontFamily="Inter" color={color.branco} fontSize={23}>
							{abreviarNome(dados.nome)}
						</Typography>
					</Box>
					<Box>
						<Typography fontWeight={900} fontFamily="Inter" color={color.branco}>
							Email:
						</Typography>
						<Typography fontWeight={200} fontFamily="Inter" color={color.branco} fontSize={23}>
							{dados.email}
						</Typography>
					</Box>
					<Box>
						<Typography fontWeight={900} fontFamily="Inter" color={color.branco}>
							Código:
						</Typography>
						<Typography fontWeight={200} fontFamily="Inter" color={color.branco} fontSize={23}>
							{formatarStringComQuebraDeLinha(dados.uid, 22)}
						</Typography>
					</Box>
					<Box component={'div'} flexDirection={'column'} display="flex" justifyContent="space-between" alignItems="flex-start" gap={4}>
						<Box>
							<Typography fontWeight={900} fontFamily="Inter" color={color.branco}>
								Saldo disponivel:
							</Typography>
							<Box display={'flex'} component={'div'} flexDirection={'row'} alignItems={'baseline'} gap={1}>
								<Typography color={color.branco}>SC$</Typography>
								<Typography fontWeight={900} fontFamily="Inter" color={color.verde} fontSize={30}>
									{dados.saldo}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default index;
