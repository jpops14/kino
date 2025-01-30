import { z } from 'zod';

export const editRoomSchema = z.object({
    id: z.number().int({ message: "ID must be an integer" }).nullable().optional(),
    name: z.string().nonempty({ message: "Name cannot be empty" }),
    layout: z.string().nonempty({ message: "Layout cannot be empty" })
        .regex(/^\[\s*(\[\s*("[^"]*"\s*,\s*)*("[^"]*"\s*)?\]\s*,\s*)*(\[\s*("[^"]*"\s*,\s*)*("[^"]*"\s*)?\]\s*)\]$/, { message: "Layout must be a valid JSON array of arrays of strings" })
        .refine(async (value) => {
            try {
                const parsedLayout: string[][] = await JSON.parse(value);
                const seats = parsedLayout.flat().filter((seat) => seat !== "*");
                return (new Set(seats).size === seats.length);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                return false;
            }
        }, {message: "Seat names must be unique"}),
    information: z.string().max(120).optional(),
});
