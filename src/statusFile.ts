/**
 * @author Aaron Osher <aaron@aaronosher.io>
 */
import { get } from 'request';
import config from './config';


/**
 * Class for loading the VATSIM status file
 */
class StatusFile {
	/**
	 * VATSIM Status file as a string
	 * @type {String}
	 */
	private file: String;

	/**
	 * URL fo the status file to use
	 * @type {String}
	 */
	private url: String;

	/**
	 * Array of possible status file options
	 * @type {Array<String>}
	 */
	private options: Array<String>;

	/**
	 * constructor loads file and then passes the file to the callback
	 * @param {Function}
	 */
	constructor(callback: Function){
		this.loadOptions(() => {
			this.selectOption();
			this.loadFile(callback);
		});
	}

	/**
	 * Gets the status file options from the status file url
	 * @param {Function}
	 */
	loadOptions(callback: Function): void {
		get(config.statusUrl, (error: any, response:any, body:any) => {
			if (!error && response.statusCode == 200) {
		        let bodyArray: Array<String>;
		        bodyArray = body.split("\n");
		        bodyArray.forEach((val, i) => {
		        	if(val.substr(0, config.statusFileStartIndex) === config.statusFileIdent) {
		        		let url: String = val.substr(config.statusFileStartIndex);
		        		url = url.split("\r")[0];
		        		if(!this.options) {
		        			this.options = [url];
		        		} else {
		        			this.options.push(url);
		        		}
		        	}
		        });
		        callback();
		    }
		});
	}

	/**
	 * Randomly selects a file
	 */
	selectOption(): void {
		this.url = this.options[Math.floor(Math.random() * this.options.length)];
	}

	/**
	 * Retrieves status file and passess it to callback
	 * @param {Function}
	 */
	loadFile(callback: Function): void {
		get(this.url.toString(), (error: any, response: any, body: any) => {
			if (!error && response.statusCode == 200) {
				this.file = body;
				callback(this.file);
			}
		})
	}
}

export { StatusFile }