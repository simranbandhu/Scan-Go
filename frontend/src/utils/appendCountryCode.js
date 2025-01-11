const appendCountryCode = (phoneNumber) => {
  let usersPhoneNumber = phoneNumber;
  if (usersPhoneNumber[0] !== "0") {
    usersPhoneNumber = "0" + usersPhoneNumber;
  }
  usersPhoneNumber = usersPhoneNumber.replace(/^0/, "+91");
  return usersPhoneNumber;
};

export default appendCountryCode;
