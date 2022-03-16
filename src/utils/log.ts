const info = async (title: string, data: object) => {
	// eslint-disable-next-line
	console.log(`%c API INFO: ${title}`, `color:green`);
	// eslint-disable-next-line
	console.log(data);
};

const warning = async (title: string, data: object) => {
	// eslint-disable-next-line
	console.log(`%c API WARNING: ${title}`, `color:yellow`);
	// eslint-disable-next-line
	console.log(data);
};

const error = async (title: string, data: object) => {
	// eslint-disable-next-line
	console.log(`%c API ERROR: ${title}`, `color:red`);
	// eslint-disable-next-line
	console.log(data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { info, warning, error };
