import { config } from 'dotenv-safe';
import { postgresJsConfig } from './database/connect.ts';

config();

const options = postgresJsConfig;

export default options;
