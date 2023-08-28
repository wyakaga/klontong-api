module.exports = {
	generateSku: (length) => {
		let result = "";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			result += characters.charAt(randomIndex);
		}

		return result;
	},
};
