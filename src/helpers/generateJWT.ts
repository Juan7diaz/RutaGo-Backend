import jwt from 'jsonwebtoken'

export const generateJWT = ( uid:number, role:string  ) => {
  return new Promise( (resolve, reject) => {

    const payload = { uid, role }
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