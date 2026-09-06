const futureDate = new Date();
futureDate.setMonth(futureDate.getMonth() + 3);

const month = String(futureDate.getMonth() + 1).padStart(2, '0');
const yearFull = futureDate.getFullYear();

const expDate = `${month}/${yearFull}`;

export const customer = {
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
  fullName: 'Jane Doe',
  address: {
    country: 'Germany',
    postalCode: '60311',
    houseNumber: '10',
    state: 'Hessen',
  },
  paymentMethod: 'Credit Card',
  creditCard: {
    cardNumber: '1111-1111-1111-1111',
    expDate: expDate,
    cvv: '111',
    cardHolderName: 'Jane Doe',
  },
};
