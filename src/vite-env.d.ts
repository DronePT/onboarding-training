/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APPWRITE_ENDPOINT: string;
  readonly VITE_APPWRITE_PROJECT_ID: string;
  readonly VITE_APPWRITE_API_KEY: string;
  readonly VITE_APPWRITE_DATABASE_ID: string;
  readonly VITE_APPWRITE_TRAININGS_COLLECTION_ID: string;
  readonly VITE_APPWRITE_TRAININGS_STEPS_COLLECTION_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
