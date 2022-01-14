import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 1 },
    { duration: '1m', target: 0 } // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3001'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/products/50000/styles`, null, { tags: { name: 'SDC' } }],
  ]);

  sleep(1);
}