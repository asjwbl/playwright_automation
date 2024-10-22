import { faker } from '@faker-js/faker';

// for centralized data, reused when needed
export const defaultUserDetails = () => ({
  title: 'Mr',
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthDay: faker.datatype.number({ min: 1, max: 28 }).toString(),
  birthMonth: faker.datatype.number({ min: 1, max: 12 }).toString(),
  birthYear: faker.datatype.number({ min: 1970, max: 2000 }).toString(),
  company: faker.company.name(),
  address1: faker.address.streetAddress(),
  address2: faker.address.secondaryAddress(),
  country: 'Canada',
  state: faker.address.state(),
  city: faker.address.city(),
  zipcode: faker.address.zipCode(),
  mobileNumber: faker.phone.number(),
});

export const paymentDetails = {
  nameOnCard: faker.person.firstName(),
  cardNumber: '4242424242424242', // Example card number
  cvc: '123',
  expirationMonth: '12',
  expirationYear: '2025',
};

export const products = [
  {
    name: 'Blue Top',
    price: 'Rs. 500',
    quantity: '1',
    total: 'Rs. 500',
  },
  {
    name: 'Men Tshirt',
    price: 'Rs. 400',
    quantity: '1',
    total: 'Rs. 400',
  },
];
