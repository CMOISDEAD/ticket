import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: {
      email: 'camilo@gmail.com',
    },
    update: {},
    create: {
      name: 'camilo esteban davila',
      username: 'camilodavila',
      email: 'camilo@gmail.com',
      password: 'password123',
      phone: '1234567890',
      address: '123 Main st, 123 house',
      role: 'ADMIN',
    },
  });

  console.log({
    user1,
  });
}

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
