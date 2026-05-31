import { prisma } from "../utils/prisma";

export type CreateContactMessageInput = {
  name: string;
  email: string;
  company?: string;
  purpose: string;
  message: string;
};

export function createContactMessage(input: CreateContactMessageInput) {
  return prisma.contactMessage.create({
    data: input
  });
}
