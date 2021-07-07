import { Client } from 'pg';
import dbCredentials from './db-credentials';

export default class DbManager {
  private client: Client;

  private async connect() {
    if (!this.client) {
      this.client = new Client(dbCredentials);
    }

    return this.client.connect();
  }

  async query(...params) {
    await this.connect();
    const response = await this.client.query(...params);
    await this.disconnect();

    return response.rows;
  }

  private async disconnect() {
    await this.client.end();

    this.client = null;
  }
}
