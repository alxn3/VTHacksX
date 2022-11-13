import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const backend = path.join(process.cwd(), '..', 'backend');
  console.log(req.body.query);
  let child = exec(
    `python3 ${path.join(backend, 'main_algo.py')} "${
      req.body.query
    }" "${backend}/"`
  );
  child?.stdout?.pipe(process.stdout);
  await new Promise((resolve) => child?.stdout?.on('end', resolve));
  let raw = fs.readFileSync(path.join(backend, 'output.json'));
  res.status(200).json(JSON.parse(raw.toString()));
}
