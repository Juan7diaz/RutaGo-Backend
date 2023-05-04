import jwt from 'jsonwebtoken'

export const generateJWT = ( uid:number ) => {
  return new Promise( (resolve, reject) => {

    const payload = { uid }
    const secretOrPrivateKey = process.env.TOKEN_SECRET!.toString();

    jwt.sign( payload, secretOrPrivateKey, {expiresIn: '1h'}, (err, token) => {
      if( err ){
        console.log(err)
        reject("No se pudo generar el token")
      }else{
        resolve( token )
      }
    })

  })

}