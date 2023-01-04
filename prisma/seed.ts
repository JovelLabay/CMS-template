import { PrismaClient } from '@prisma/client'
import { modules_list } from './modules_list'

const prisma = new PrismaClient()

async function main() {
    for (let module_list of modules_list) {
        await prisma.modules.create({
            data: {
                ...module_list
            }
        })
    }
}


main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(() => {
    prisma.$disconnect()
})