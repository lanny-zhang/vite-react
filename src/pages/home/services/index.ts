import { request } from '@/util/request';

const prefix = import.meta.env.VITE_BASE_API;

export function testRequest() {
  return request(`${prefix}/test`, { method: 'GET' });
}
