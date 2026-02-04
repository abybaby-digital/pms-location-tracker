export const adminPasswordRule = (value) => {
  const upperCaseFormat = /^[A-Z]/;
  const totalCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  if (!upperCaseFormat.test(value)) {
    return "Password first letter must be uppercase.";
  } else if (!totalCheck.test(value)) {
    return "Password must be combination of minimum 1 lowercase letter,1 special character,1 number and min length 8 characters & max length 30";
  }
  return true;
};
