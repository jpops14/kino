import { z } from "zod";

export const editEventSchema = z.object({
    id: z.number().nonnegative("ID must be a non-negative number").nullable(),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    screenings: z.array(z.number().nonnegative("Screening ID must be a non-negative number")).nonempty("At least one screening ID is required"),
});