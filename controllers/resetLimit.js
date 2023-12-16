const prisma = require("../database/index");
const cron = require("node-cron");


cron.schedule('0 0 * * *', async () => {
    const result = await prisma.user.updateMany({
        data : { limit : 3 }
    });
    console.log(result);
});