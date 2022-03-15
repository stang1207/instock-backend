const validiateWarehouse = (obj) => {
  const emailRe = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const phoneRe = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (
    !obj.name.trim() ||
    !obj.address.trim() ||
    !obj.city.trim() ||
    !obj.country.trim() ||
    !obj.contact.name.trim() ||
    !obj.contact.position.trim() ||
    !obj.contact.phone.trim().match(phoneRe) ||
    !obj.contact.email.trim().match(emailRe)
  ) {
    return false;
  }
  return true;
};

module.exports = {
  validiateWarehouse,
};
