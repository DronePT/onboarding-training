import { Client, Databases } from 'appwrite';

export class AppWriteClient {
  private static _instance: AppWriteClient;

  private _client!: Client;
  private _databases!: Databases;

  private constructor() {
    if (AppWriteClient._instance) {
      return AppWriteClient._instance;
    }

    this._client = new Client();
    this._databases = new Databases(this._client);

    this._client
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

    AppWriteClient._instance = this;
  }

  public static getInstance(): AppWriteClient {
    return new AppWriteClient();
  }

  public static get instance(): AppWriteClient {
    return AppWriteClient.getInstance();
  }

  public get client(): Client {
    return this._client;
  }

  public get databases(): Databases {
    return this._databases;
  }
}
