interface ImportMeta {
	readonly env: ImportMetaEnv;
}
interface ImportMetaEnv {
	// This variable is set in our GitHub Actions for adding additional features
	// that should be only available on karte.queer-lexikon.net and not
	// for development purposes.
	//
	// Although it's actually a boolean, all environment variables are strings, so we
	// type it as string here as well.
	readonly VITE_QUEER_LEXIKON_PRIVATE?: string;

	// The backend URL for the upcoming django backend.
	readonly VITE_QUEER_LEXIKON_BACKEND_URL?: string;
}
