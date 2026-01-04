import 'dotenv/config';
import { DataSource } from 'typeorm';
import configuration from './configuration';

const config = configuration();

export const AppDataSource = new DataSource({
    ...config.database,
});