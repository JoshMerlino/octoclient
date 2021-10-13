declare namespace Octo {
	// Possible states of the printer
	type PrinterState =
		| "Offline"
		| "Opening serial connection"
		| "Detecting serial connection"
		| "Connecting"
		| "Operational"
		| "Starting print from SD"
		| "Starting to send file to SD"
		| "Starting"
		| "Printing from SD"
		| "Sending file to SD"
		| "Printing"
		| "Cancelling"
		| "Pausing"
		| "Paused"
		| "Resuming"
		| "Finishing"
		| "Offline"
		| "Error"
		| "Offline after error"
		| "Transferring file to SD";

	// Baudrates
	type BaudRate = 250000 | 230400 | 115200 | 57600 | 38400 | 19200 | 9600;

	// Permission requirements
	interface Needs {
		role: string[];
		group: string[];
	}

	// Permissions
	interface Permission {
		key: string;
		name: string;
		dangerous: boolean;
		default_groups: string[];
		description: string;
		needs: Needs;
	}

	// Current user
	interface User {
		groups: string[];
		name: string;
		permissions: Permission[];
	}

	// Printer state flags
	interface Flags {
		cancelling: boolean;
		closedOrError: boolean;
		error: boolean;
		finishing: boolean;
		operational: boolean;
		paused: boolean;
		pausing: boolean;
		printing: boolean;
		ready: boolean;
		resuming: boolean;
		sdReady: boolean;
	}

	// Current state
	interface State {
		error: string;
		flags: Flags;
		text: PrinterState;
	}

	// Temperature
	interface Temperature {
		actual: number;
		target: number;
		offset: number;
	}

	// Full state
	interface FullState {
		state: State;
		temperature: Record<string, Temperature>;
	}

	interface Connection {
		current: {
			state: PrinterState;
			port: string;
			baudrate: BaudRate;
			printerProfile: string;
		};
		options: {
			ports: string[];
			baudrates: BaudRate[];
			printerProfiles: {
				name: string;
				id: string;
			}[];
			portPreference: string;
			baudratePreference: BaudRate;
			printerProfilePreference: string;
			autoconnect: boolean;
		};
	}
}
