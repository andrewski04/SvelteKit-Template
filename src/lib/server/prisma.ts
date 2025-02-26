import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
