import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import {color} from '../../../env.json'

console.log(color.principal)
const Grid_amarelo = styled(Grid)(({theme}) => ({
	backgroundColor: color.principal
}))

export{
	Grid_amarelo
}
