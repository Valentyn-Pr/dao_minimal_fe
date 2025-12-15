interface ImportMetaEnv {
  readonly VITE_ALCHEMY_KEY: string;
  readonly VITE_REOWN_PROJECT_ID: string;
  readonly VITE_GOV_TOKEN_ADDR: string;
  readonly VITE_DAO_ADDR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
