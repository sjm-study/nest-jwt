import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission';
export const Roles = (...permissions: string[]) => SetMetadata(PERMISSION_KEY, permissions);
