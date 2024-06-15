export const isValidEmail= (stringEmail) => {
   return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))
}

export const isValidPassword = (stringPassword) => {
    return  stringPassword.length >=1 && stringPassword.length <=10
    // return  (/^(?=.*?[0-9])(?=.*?[A-Za-z]).{3,32}$/.test(stringPassword))
    //chứa chữ số (thường or hoa) , chứa kí tự , chiều dài 3-82 kí tự
    //Mật khẩu hợp lệ: Abcd1234, P@ssw0rd, MyPassword123
    //Mật khẩu không hợp lệ: password, 12345678, Abcdefg
}
export const isValidUsername = (stringUsername) => {
    return  (/^[0-9A-Za-z]{3,16}$/.test(stringUsername))
// return stringUsername.length >=1 && stringUsername.length <=10
//Các ký tự cho phép: Bất kỳ ký tự chữ cái và số nào (0-9, A-Z, a-z).
//Yêu cầu về độ dài: Phải có độ dài từ 3 đến 16 ký tự.
//khong dc co ki tu dac biet
  //Tên người dùng hợp lệ: john123, Alice4567, user007, helloWorld1234
  //Tên người dùng không hợp lệ: user@name, 12345, abcdefghijklmnopqrst, ThisUsernameIsWayTooLong
}
export const isValidConfirmPassword = (stringPassword,stringConfirmPassword) => {
  return  stringPassword===stringConfirmPassword
  // return  (/^(?=.*?[0-9])(?=.*?[A-Za-z]).{3,32}$/.test(stringPassword))
  //chứa chữ số (thường or hoa) , chứa kí tự , chiều dài 3-82 kí tự
  //Mật khẩu hợp lệ: Abcd1234, P@ssw0rd, MyPassword123
  //Mật khẩu không hợp lệ: password, 12345678, Abcdefg
}