import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const password1 = await bcrypt.hash('camilo_pass', roundsOfHashing);
  const password2 = await bcrypt.hash('esteban_pass', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: {
      email: 'camilodavina@gmail.com',
    },
    update: {
      password: password1,
    },
    create: {
      name: 'camilo esteban davila',
      username: 'camilodavila',
      email: 'camilodavina@gmail.com',
      password: password1,
      phone: '1234567890',
      address: '123 Main st, 123 house',
      role: 'ADMIN',
    },
  });

  const user2 = await prisma.user.upsert({
    where: {
      email: 'esteban@gmail.com',
    },
    update: {
      password: password2,
    },
    create: {
      name: 'esteban davila',
      username: 'estebandavila',
      email: 'esteban@gmail.com',
      password: password2,
      phone: '1234567890',
      address: '123 Main st, 123 house',
      role: 'USER',
    },
  });

  const venue = await prisma.venue.upsert({
    where: {
      name: 'Movistar Arena',
    },
    update: {},
    create: {
      name: 'Movistar Arena',
      address: 'Bogotá, Colombia',
      city: 'Bogotá',
      capacity: 10000,
    },
  });

  const event = await prisma.event.upsert({
    where: {
      name: 'BILLY IDOL | IT´S A NICE DAY TO… TOUR AGAIN',
    },
    update: {},
    create: {
      name: 'BILLY IDOL | IT´S A NICE DAY TO… TOUR AGAIN',
      description:
        'Billy Idol, leyenda del rock y una de las voces más emblemáticas del punk/new wave de los años 80, llega al Movistar Arena de Bogotá el martes 25 de noviembre con su gira It’s a Nice Day To… Tour Again!. Con más de cuatro décadas de carrera que arrancaron en la escena punk londinense y lo llevaron al estrellato con clásicos como “Rebel Yell” y “White Wedding”, Idol ha demostrado su capacidad de conectar con audiencias múltiples generaciones. Su reactivación con shows sold out en Europa y Estados Unidos ha reavivado la atención global hacia su música, reafirmando su impacto y relevancia.',
      category: 'CONCERT',
      vipCapacity: 200,
      vipAvailable: 200,
      regularCapacity: 500,
      regularAvailable: 500,
      vipPrice: 300_000,
      regularPrice: 150_000,
      date: new Date('2025-11-25T05:00:00Z'),
      venue: {
        connect: {
          id: venue.id,
        },
      },
    },
  });

  const order = await prisma.order.create({
    data: {
      event: {
        connect: {
          id: event.id,
        },
      },
      user: {
        connect: {
          id: user1.id,
        },
      },
      total: 300_000,
      tickets: {
        create: [
          {
            event: { connect: { id: event.id } },
            price: 150_000,
            type: 'REGULAR',
            status: 'RESERVED',
          },
          {
            event: { connect: { id: event.id } },
            price: 150_000,
            type: 'REGULAR',
            status: 'RESERVED',
          },
        ],
      },
    },
  });

  console.log({ user1, user2, venue, event, order });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
