//Validate warehouse object
const validiateWarehouse = (obj) => {
  const emailRe = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const phoneRe =
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const errors = [];

  if (!obj.name.trim()) {
    errors.push('Name');
  }

  if (!obj.address.trim()) {
    errors.push('Address');
  }

  if (!obj.address.trim()) {
    errors.push('City');
  }

  if (!obj.country.trim()) {
    errors.push('Country');
  }

  if (!obj.contact.name.trim()) {
    errors.push('Contact name');
  }

  if (!obj.contact.position.trim()) {
    errors.push('Position');
  }

  if (!obj.contact.phone.trim().match(phoneRe)) {
    errors.push('Phone');
  }

  if (!obj.contact.email.trim().match(emailRe)) {
    errors.push('Email');
  }

  //If there is error, return an array containing the error
  if (errors.length > 0) {
    return errors;
  }
  //If object passed validation, do nothing and return null
  return null;
};

module.exports = {
  validiateWarehouse,
};
