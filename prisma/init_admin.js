import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient()
const isUser = await prisma.user.findMany({ take: 1}).then((users) => users.length > 0);
if (!isUser) {
  const adminName = process.env.ADMIN_NAME;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const PASSWORD_SALT_ROUNDS = process.env.PASSWORD_SALT_ROUNDS;
  if (!adminName || !adminEmail || !adminPassword || !PASSWORD_SALT_ROUNDS) {
    throw new Error('ADMIN_EMAIL, ADMIN_PASSWORD and PASSWORD_SALT_ROUNDS must be set in .env');
  }
  const salt = bcrypt.genSaltSync(parseInt(PASSWORD_SALT_ROUNDS));
  const hashedAdminPassword = await bcrypt.hash(adminPassword, salt);
  const admin = await prisma.user.create({
    data: {
      role: 'ADMIN',
      email: adminEmail,
      name: adminName,
      password: hashedAdminPassword
    }
  });
  if (admin) {
    console.log('Created admin user');
  } else {
    console.log('Failed to create admin user');
  }
  
} else {
  console.log('Skipping admin init');
}
