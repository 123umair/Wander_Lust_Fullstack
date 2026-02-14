import React from 'react'

const Form = () => {
  return (
    <div>Listing Form

<form action="Get" method='listing/create'>

 <label htmlFor="name"></label>
  
  <input type="text" name='title' placeholder='Enter your title'/>
  <br /><br />
  <textarea name="description" id="" placeholder='Enter your description'></textarea>
  <br /><br />
  <input type="text" placeholder='enter your image/url' />
  <br /><br />
  <input type="number" placeholder='price'  />
  <br /><br />
  <input type="text" placeholder='Enter your coutnry'  />
  <br /><br />
  <input type="text" placeholder='Enter your location'  />

</form>

    </div>
  )
}

export default Form