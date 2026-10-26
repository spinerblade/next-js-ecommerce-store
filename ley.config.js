import { postgresJsConfig, setEnvironmentVariables } from './util/config.ts';

setEnvironmentVariables();

const options = postgresJsConfig;

export default options;
