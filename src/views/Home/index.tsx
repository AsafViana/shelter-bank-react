import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import SvgIcon from '@mui/material/SvgIcon'
import { Grid_amarelo } from '../../components/GridCustomizado'
import { useEffect, useState } from 'react'
import {color, ministerio} from '../../../env.json'
import { signOut, db, collection, getDocs, auth } from '../../service/firebase'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/ShelterBank.svg'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import IconButton from '@mui/material/IconButton'


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
			const dados: any[] = []
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
		navigate('Login')
	}

	useEffect(() => {
		const fetchData = async () => {
			await pegaDados()
		}

		fetchData()
	}, [Dados])

	if (!Carregou) return

	return (
			<Grid  component="main" sx={{ height: '100vh', backgroundColor: color.principal, paddingX: 4, paddingTop: 5 }}>
				<CssBaseline />
				<Grid container component='div' sx={{  height: 'auto' }}>
					<img src={Logo} alt="Logo Shelter Bank" style={{width: 100}} />
						<MeetingRoomIcon sx={{width: 200, fontSize: 50, color: color.vermelho, alignSelf: 'center', justifySelf: 'end'}}/>
				</Grid>
			</Grid>
	)
}
