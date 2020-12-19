const _generate_google_address = (event_address) => {
  let modified_address = event_address.replace(' ', '%20')
  return `https://www.google.com/maps/embed/v1/place?q=${modified_address}&key=AIzaSyAYSBV_aPK7t_266BK4D7Vf4LUUbdyk2t8`
}

export default { _generate_google_address }