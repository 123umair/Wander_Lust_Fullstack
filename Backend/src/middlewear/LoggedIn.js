export const LoggedIn = (req,res,next) =>{
  const user = req.user //passport user ka data req.user may rakta hy .
  console.log("user (authenticate middle wear is executed.)",user)
 if(!req.isAuthenticated())
{
  return res.status(401).json({
    success:false,
    message:"User is not Authorized."
  })

}

  next() // another lines of cod is executed if the use is LoggedIn.
}

