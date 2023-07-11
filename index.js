//Objetos HTML
const contenedor=document.getElementById("carrusel")

const carrusel=document.getElementById("lienzo")

const images=document.querySelectorAll(".carrusel__img")

//Controles del Carrusel
let pInicialX=0								//posicion horizontal
let pActual=0								//donde se encuentra (X) el carrusel
let moveX=0									//moviemiento horizontal
let currentImage=0							//indice de imagenes
let widthCarrusel=contenedor.offsetWidth	//ancho del carrusel

//timers
let animAutomatica=0						//almacena el ID del desplazamiento automatico

function iniciarAnimacion(){
	animAutomatica=setInterval(()=>{

		if(currentImage < images.length-1){
			currentImage++
		}else{
			currentImage=0
		}

		let movimiento= -currentImage * widthCarrusel

		carrusel.style.transition="transform 0.3s ease-in"
		carrusel.style.transform="translateX("+movimiento+"px)"

		pActual=movimiento

	},1000)
}

window.addEventListener("resize",()=>{

	images.forEach((img)=>{
		//width
		img.style.minWidth=window.innerWidth+"px"
	})

})

		function iniArrastre(event){

			pInicialX= event.clientX || event.touches[0].clientX
			moveX= 0
			pActual= parseInt(carrusel.style.transform.replace("translateX(",""),10) || 0 
			carrusel.style.transition="none"
		
			clearTimeout(animAutomatica)

		}

		function arrastre(event){

			if(pInicialX){
				
				const posX = event.clientX || event.touches[0].clientX
				moveX = pInicialX - posX

				carrusel.style.transform="translateX("+(pActual - moveX)+"px)"
			}

			clearTimeout(animAutomatica)

		}

		function finArrastre(event){

			let x=event.clientX || event.changedTouches[0].clientX

			if(pInicialX){
				const recorrido= pInicialX - x

				if(recorrido > widthCarrusel/3 && currentImage < images.length-1)
				{
					currentImage++
				}else if(recorrido < -widthCarrusel/3 && currentImage >0 ){
					currentImage--
				}

				const movimiento= -currentImage * widthCarrusel

				carrusel.style.transition="transform .3s ease-in"
				carrusel.style.transform="translateX("+movimiento+"px)"

				pInicialX=0
				moveX=0
				pActual=movimiento

				iniciarAnimacion()

			}

		}