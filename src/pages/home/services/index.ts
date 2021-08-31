import { request } from '@/util/request';

export function testRequest() {
  return request('/api/s?cl=3&tn=baidutop10&fr=top1000&wd=美军撤离行动结束+外交部回应&rsv_idx=2&rsv_dl=fyb_n_homepage&hisfilter=1', { method: 'get' });
}
