//All operations releated to files

const fs = require("fs"); //File System Module

async function writeFile(obj) {
	await fs.writeFile("./data.json", JSON.stringify(obj), (err) => {
		if (err) console.error(err);
	});
}

module.exports = { writeFile };