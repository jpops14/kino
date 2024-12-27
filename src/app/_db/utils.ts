import { Prisma } from "@prisma/client"

export const handlePrismaError = (error: unknown) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(`PrismaClientKnownRequestError:   ${error.code} > ${error.message}`)
        if (error.meta) {
            console.debug(`^ ${error?.meta}`)
        }
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.error(`PrismaClientUnknownRequestError: ${error.message}`)
    } else if (error instanceof Prisma.PrismaClientRustPanicError) {
        console.error(`PrismaClientRustPanicError:      ${error.message}`)
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
        console.error(`PrismaClientInitializationError: ${error.errorCode} > ${error.message}`)
    } else if (error instanceof Prisma.PrismaClientValidationError) {
        console.error(`PrismaClientValidationError:     ${error.message}`)
    }
}