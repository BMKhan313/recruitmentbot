import * as Yup from 'yup';

// export const signUpSchema = yup.object().shape({
//   name: yup.string().required('required'),
//   email: yup.string().email('invalid email').required('required'),
//   password: yup.string().min(8, 'minimum 8 characters'),
// });

// export const loginSchema = yup.object().shape({
//   email: yup.string().email('invalid email').required('required'),
//   password: yup.string().required('required'),
// });

export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

export const updatePasswordSchema = Yup.object().shape({

  password: Yup.string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must contain 8 characters including 1 uppercase, 1 lowercase, 1 number and 1 special case character"),
  confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});


export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

});


export const signUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  cnic: Yup.string().required('Required'),


  password: Yup.string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must contain 8 characters including 1 uppercase, 1 lowercase, 1 number and 1 special case character"),
  confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),


  // password: Yup.string()
  //   .min(6, 'Password has to be longer than 6 characters!')  
  //   .required('Password is required!'),
  // password: Yup.string()
  //   .min(6, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // password: Yup.string()
  //   .required('Password is required')
  //   .min(5, 'Your password is too short.')
  //   .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  // password: Yup.string()
  //   .required('Password is required')
  //   .min(
  //     8,
  //     'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
  //   )
  //   .minLowercase(1, 'password must contain at least 1 lower case letter')
  //   .minUppercase(1, 'password must contain at least 1 upper case letter')
  //   .minNumbers(1, 'password must contain at least 1 number')
  //   .minSymbols(1, 'password must contain at least 1 special character'),

});

