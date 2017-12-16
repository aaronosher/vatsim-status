import { StatusFile } from './statusFile';

/**
 * 
 */
class VatsimStatus {

}

let statusFile = new StatusFile((file: any) => {
	console.log(file);
});