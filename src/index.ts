import 'reflect-metadata';
import container from './container/container';
import { symbols } from './container/symbols';
import server from './container/app';
import Config from './config';

const { httpPort } = container.get<Config>(symbols.Config);
const app = server.build();

app.listen(httpPort, () => console.log(`Listening on ${httpPort}`));
