const FS = require('fs');
const PATH = require('path');

function safeReadDirSync (path) {
	let dirData = {};
	try {
		dirData = FS.readdirSync(path);
	} catch(ex) {
		if (ex.code == "EACCES")
			//User does not have permissions, ignore directory
			return null;
		else throw ex;
	}
	return dirData;
}

function directoryTree (path, options, onEachFile) {
	const name = PATH.basename(path);
	const item = { path, name };
	let stats;

	try { stats = FS.statSync(path); }
	catch (e) { return null; }
	if (stats.isFile()) {
		const ext = PATH.extname(path).toLowerCase();

		// Only add files with the provided extensions
		if (options &&
			options.extensions &&
			options.extensions.length &&
			options.extensions.indexOf(ext) === -1)
			return null;

		item.size = stats.size;  // File size in bytes
		item.extension = ext;
		if (onEachFile) {
			onEachFile(item, PATH);
		}
	}
	else if (stats.isDirectory()) {
		let dirData = safeReadDirSync(path);
		if (dirData === null) return null;
		item.children = dirData
			.map(child => directoryTree(PATH.join(path, child), options, onEachFile))
			.filter(e => !!e);
		item.size = item.children.reduce((prev, cur) => prev + cur.size, 0);
	} else {
		return null; // Or set item.size = 0 for devices, FIFO and sockets ?
	}
	return item;
}

module.exports = directoryTree;
