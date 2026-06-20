export const LoggedIn = (req, res, next) => {
  const user = req.user //passport user ka data req.user may rakta hy .

  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "User is not Authorized."
    })

  }

  next() // another lines of cod is executed if the use is LoggedIn.
}

