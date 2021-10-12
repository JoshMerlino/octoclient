/* eslint camelcase: off */
declare const PRODUCTION: boolean;

declare interface View {
	route: string;
	default: React.ComponentType;
	title?: string;
}

declare interface AppManifest {
	name: string;
    short_name: string;
	version: string;
	description: string;
	developerName: string;
	developerURL: string;
	background_color: string;
	theme_color: string;
	orientation: string;
	crossorigin: string;
	icons: {
		src: string;
		sizes: number[];
		purpose?: string;
		destination: string;
	}[];
}

declare const APP_MANIFEST: AppManifest;
declare const APP_CONFIG: any;

declare interface OctoUser {
	groups: string[];
	name: string;
	permissions: string[];
}

declare interface OctoConnection {
	current: {
        state: PrinterState;
        port: string;
        baudrate: number;
        printerProfile: string;
    },
	options: {
		ports: string[];
        baudrates: number[];
        printerProfiles: {
			name: string;
			id: string;
		}[];
        portPreference: string;
        baudratePreference: number;
        printerProfilePreference: string;
        autoconnect: boolean;
	}
}

declare interface OctoTemp {
	actual: number | null;
	target: number | null;
	offset: number;
}

declare type PrinterState = "Operational" | "Printing" | "Detecting serial connection" | "Cancelling" | "";

declare interface OctoState {
	temperature: Record<string, OctoTemp>;
	state: {
		text: PrinterState,
		flags: {
			operational: boolean,
			paused: boolean,
			printing: boolean,
			cancelling: boolean,
			pausing: boolean,
			sdReady: boolean,
			error: boolean,
			ready: boolean,
			closedOrError: boolean
		}
	}
}
