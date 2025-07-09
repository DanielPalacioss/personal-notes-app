import { Directory } from '@prisma/client';

export type CreateDirectoryDto = Omit<
  Directory,
  'id' | 'createdAt' | 'updatedAt'
>;
