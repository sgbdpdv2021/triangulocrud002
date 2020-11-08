import { menuTriangulo } from './vistas/menu'
import { leerTeclado } from './vistas/lecturaTeclado'
import { Triangulo, Triangulos, tTriangulo} from './model/Triangulo'
import { db } from './database/database'

const main = async () => {
    let n: number
    let query: any

    let nombre: string, base: number, altura: number, lado1: number, lado2: number
    let triangulo: Triangulo = new Triangulo("",0,0,0)


    await setBD(false) // true BD local; false BD Atlas

    do {
        n = await menuTriangulo()

        switch(n){
            case 1:
                nombre = await leerTeclado('Introduzca el nombre único del triángulo')
                base =  parseInt( await leerTeclado('Introduzca la base del triángulo'))
                altura =  parseInt( await leerTeclado('Introduzca la altura del triángulo'))
                lado1 =  parseInt( await leerTeclado('Introduzca otro lado del triángulo'))
                lado2 =  parseInt( await leerTeclado('Introduzca el último lado del triángulo'))
                triangulo = new Triangulo(nombre, base, lado1, lado2)
                try {
                    triangulo.altura = altura
                }catch(error){
                    console.log(error)
                    triangulo = new Triangulo("",0,0,0)
                }
                break
            case 2:
                try{
                    let area = triangulo.area()
                    console.log(`Área del triángulo= ${area} cm2`)
                }catch (e){
                    console.log("No ha entrado en la opción 1: " + e)
                }
                break
            case 3:
                try{
                    let perimetro = triangulo.perimetro()
                    console.log(`Perímetro del triángulo= ${perimetro} cm`)
                }catch (e){
                    console.log("No ha entrado en la opción 1: " + e)
                }
                break
            case 4:
                altura =  parseInt( await leerTeclado('Introduzca la altura del triángulo'))
                triangulo.altura = altura
                break
            case 5:
                await db.conectarBD()
                const dSchema = {
                    _nombre: triangulo.nombre,
                    _base: triangulo.base,
                    _lado2: triangulo.lado2,
                    _lado3: triangulo.lado3,
                    _altura: triangulo.altura
                }
                const oSchema = new Triangulos(dSchema)
                // Controlamos el error de validación
                // Hay que hacer el control con then y catch 
                // Con el callback de save salta a la siguiente instrucción 
                // mientras se resuelve el callback y se desconecta y sigue el switch
                await oSchema.save()
                .then( (doc) => console.log('Salvado Correctamente: '+ doc) )
                .catch( (err: any) => console.log('Error: '+ err)) 
                // concatenando con cadena muestra sólo el mensaje

                await db.desconectarBD()
                break
            case 6:
                await db.conectarBD()
                nombre = await leerTeclado('Introduzca el nombre único del triángulo')

                await Triangulos.findOne( {_nombre: nombre}, 
                    (error, doc: any) => {
                        if(error) console.log(error)
                        else{
                            if (doc == null) console.log('No existe')
                            else {
                                console.log('Existe: '+ doc)
                                triangulo = 
                                    new Triangulo(doc._nombre, doc._base, doc._lado2, doc._lado3)
                                triangulo.altura = doc._altura  
                            }
                        }
                    } )
                await db.desconectarBD()
                break
            case 7:
                await db.conectarBD()
                // Controlamos el error de validación
                // Recordar que hay que poner la opción useFindAndModify: false
                await Triangulos.findOneAndUpdate( 
                    { _nombre: triangulo.nombre }, 
                    {
                        _nombre: triangulo.nombre,
                        _base: triangulo.base,
                        _lado2: triangulo.lado2,
                        _lado3: triangulo.lado3,
                        _altura: triangulo.altura
                    },
                    {
                        runValidators: true // para que se ejecuten las validaciones del Schema
                    }  
                )                
                .then(() => console.log('Modificado Correctamente') )
                .catch( (err) => console.log('Error: '+err)) // concatenando con cadena muestra mensaje
                await db.desconectarBD()
                break
            case 8:
                await db.conectarBD()
                await Triangulos.findOneAndDelete(
                    { _nombre: triangulo.nombre }, 
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) console.log(`No encontrado`)
                            else console.log('Borrado correcto: '+ doc)
                        }
                    })
                await db.desconectarBD()
                break
            case 9:
                console.log(`Nombre: ${triangulo.nombre}`)
                console.log(`Base: ${triangulo.base}`)
                console.log(`Altura: ${triangulo.altura}`)
                console.log(`Lado 2: ${triangulo.lado2}`)
                console.log(`Lado 3: ${triangulo.lado3}`)                               
                break
            case 10:
                await db.conectarBD()
                let tmpTriangulo: Triangulo
                let dTriangulo: tTriangulo
                query =  await Triangulos.find( {} )
                for (dTriangulo of query){
                    tmpTriangulo = 
                        new Triangulo(dTriangulo._nombre, dTriangulo._base, 
                                dTriangulo._lado2, dTriangulo._lado3)
                    tmpTriangulo.altura = dTriangulo._altura 
                    console.log(`Triángulo ${tmpTriangulo.nombre} Área: ${tmpTriangulo.area()}`)
                }
                await db.desconectarBD()                          
                break
            case 0:
                console.log('\n--ADIÓS--')
                break
            default:
                console.log("Opción incorrecta")
                break
        }
    }while (n != 0)
}

const setBD = async (local: boolean) => {
    
    const bdLocal = 'geometria'

    const conexionLocal = `mongodb://locadlhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'prueba'
        const userAtlas = await leerTeclado('Usuario BD Atlas')
        const passAtlas = await leerTeclado('Password BD Atlas')
        const conexionAtlas =  
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.viyli.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`
        db.cadenaConexion = conexionAtlas
    }
}

main()