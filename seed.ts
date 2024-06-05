import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@gmail.com';
  const rawPassword = 'admin';
  const role = 'ADMIN';

  const password = await bcrypt.hash(rawPassword, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        role,
      },
    });

    console.log(`User with email ${email} created with role ${role}`);
  } else {
    console.log(`User with email ${email} already exists and will not be updated`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
