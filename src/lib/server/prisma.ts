import { PrismaClient } from '@prisma/client';

// save Prisma client as global, avoiding multiple instances being started

<<<<<<< HEAD
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
=======
// check db connection
async function checkDatabaseConnection() {
	try {
		await prisma.$connect();
		console.log('Database connection successful.');
	} catch (error) {
		console.error('Database connection failed.');
		console.error(error);
		process.exit(1);
	}
}

checkDatabaseConnection();

export default prisma;
>>>>>>> 1cfff795e2271a08d7a3295d56d2c0bbd83f5b20
