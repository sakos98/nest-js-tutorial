import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getClients() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17270',
      name: 'John Doe',
      address: '123 Main Street, London',
    },
    {
      id: '611c2e81-2ccb-42d8-9ddc-2d0bfa65c1b4',
      name: 'Jane Doe',
      address: '123 Main Street, London',
    },
    {
      id: '3a721b7f-7dc9-4c45-9777-516942b98e0d',
      name: 'Thomas Jefferson',
      address: 'Baker Street 12B, New York',
    },
  ];
}

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}



function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: 'john-doe-id',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      quantity: 1, 
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: 'jane-doe-id',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      quantity: 2, 
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'thomas-jefferson-id',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      quantity: 3,
    },
  ];
}

async function seed() {
  await Promise.all(
    getClients().map((client) => {
      return db.client.create({ data: client });
    }),
  );

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getOrders().map(({ productId, clientId, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
    }),
  );
}

seed();