import * as Yup from 'yup';
import { userNameAvailable } from './apiCalls';

const loginDataValidator = Yup.object().shape({
    userName: Yup.string()
    .required('user name is required'),

    password: Yup.string()
    .required('password is required'),

    remember: Yup.boolean()
    .required('remember is required'),
});

// Password complexity (custom method)
const passwordComplexity = Yup.string()
  .required('password is required')
  .min(8, 'password should be at least 8 characters')
  .max(128, 'password should not exceed 128 characters')
  .matches(/[a-z]/, 'password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'password must contain at least one uppercase letter')
  .matches(/[^a-zA-Z0-9]/, 'password must contain at least one special character');

// Date of birth validator
const dobValidation = Yup.date()
  .required('dob is required')
  .typeError('dob must be a date')
  .test('dob-range', 'Invalid date of birth', function (value) {
    if (!value) return false;

    const now = Date.now();
    const dobTime = new Date(value).getTime();
    const before10Yrs = now - 10 * 365 * 24 * 60 * 60 * 1000;
    const before120Yrs = now - 120 * 365 * 24 * 60 * 60 * 1000;

    if (dobTime > now) {
      return this.createError({ message: 'from the future' });
    }
    if (dobTime < before120Yrs) {
      return this.createError({ message: 'hmmm oldiee' });
    }
    if (dobTime > before10Yrs) {
      return this.createError({ message: 'must be 10 year old' });
    }

    return true;
  });

const createUserValidator = Yup.object().shape({
    name: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'name must only contain alphanum')
    .required('name is required')
    .min(2, 'name should contain at least 2 characters')
    .max(50, 'name should not exceed 50 characters'),

    userName: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'username must be alphanumeric')
    .required('username is required')
    .min(5, 'username should contain at least 5 characters')
    .max(20, 'username should not exceed 20 characters')
    .test(
        'username available test',
        'userName already taken',
        async(userName) => {
            return await userNameAvailable(userName);
        }

    ),

    password: passwordComplexity,

    confirmPassword: Yup.string()
    .required('confirm the password')
    .oneOf([Yup.ref('password')], 'password mismatch'),

    email: Yup.string()
    .email('email is invalid')
    .required('email is required'),

    dob: dobValidation,

    address: Yup.string()
    .notRequired(),

    agree: Yup.boolean()
    .oneOf([true], 'agree to the terms and conditions')

});


export {loginDataValidator, createUserValidator};
