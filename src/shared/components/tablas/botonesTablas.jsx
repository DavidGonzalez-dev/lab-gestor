import {Button} from "@shared/components/buttons/button/Button.jsx"
import { useState } from "react"
import {TrashIcon} from "@shared/iconos"

const VerTabla = () =>{
    const [clickBoton, setclickBoton] =useState(null)
    const handlebuttonclick = () =>{
    }   
    return(<div><Button parentMethod={()=>handlebuttonclick()} type="Button" variant="default">Ver</Button></div>)
}

const CategoriaProducto = () =>{
    const [clickBoton, setclickBoton] =useState(null)
    const handlebuttonclick = () =>{
    }   
    return(<div><Button parentMethod={()=>handlebuttonclick()} type="Button" variant="buttonDotted">Materia Prima<TrashIcon/></Button></div>)
}
 
export {VerTabla, CategoriaProducto}

