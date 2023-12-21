import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission';
export const Roles = (permissions: string[] | string | {permissions: string[] | string, key: '||' | '&&'}) => SetMetadata(PERMISSION_KEY, permissions);
