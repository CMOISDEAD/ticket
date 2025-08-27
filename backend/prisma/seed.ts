import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const password1 = await bcrypt.hash('camilo_pass', roundsOfHashing);
  const password2 = await bcrypt.hash('esteban_pass', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: {
      email: 'camilo@gmail.com',
    },
    update: {
      password: password1,
    },
    create: {
      name: 'camilo esteban davila',
      username: 'camilodavila',
      email: 'camilo@gmail.com',
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
      role: 'ADMIN',
    },
  });

  console.log({ user1, user2 });
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
