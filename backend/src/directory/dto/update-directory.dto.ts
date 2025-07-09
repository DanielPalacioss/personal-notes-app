import { Directory } from '@prisma/client';

export type UpdateDirectoryDto = Omit<
  Directory,
  'id' | 'userId' | 'createdAt' | 'updatedAt'
>;
