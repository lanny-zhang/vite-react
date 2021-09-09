import { request } from '@/util/request';

export function testRequest() {
  return request('/proxy/test', { method: 'GET' });
}
