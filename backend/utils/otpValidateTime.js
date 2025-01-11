// const otpValidateTime = async (otpTime) => {
//   try {
//     //otpTime will be/should be in milliseconds
//     const cDateTime = new Date();
//     console.log(otpTime, " ", cDateTime.getTime());
//     let diff = (otpTime - cDateTime.getTime()) / 1000;
//     diff /= 60;
//     const minutes = Math.abs(diff);
//     console.log(diff);
//     console.log("EXPIRED MINUTES: " + minutes);
//     if (minutes > 5) {
//       return true;
//     }
//     return false;
//   } catch (err) {
//     console.error(err);
//   }
// };
const otpValidateTime = async (otpTime) => {
  try {
    const currentDateTime = new Date();
    console.log(
      "otpTime: ",
      otpTime,
      " currentDateTime: ",
      currentDateTime.getTime()
    );
    if (currentDateTime > otpTime) {
      return false;
    }
    return true;
  } catch (err) {
    console.error("error in otp validate time: ", otpTime);
  }
};
module.exports = otpValidateTime;
