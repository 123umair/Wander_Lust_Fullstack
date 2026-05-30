export const LoggedIn = (req,res,next) =>{
  const user = res.body
  console.log("user",user)
 if(!req.isAuthenticated())
{
  return res.status(401).json({
    success:false,
    message:"User is not Authorized."
  })

}

  next() // another lines of cod is executed if the use is LoggedIn.
}