/*
 * Start Loading the Framework - BEGIN
 */
var loader = require('/lib/core');
Ti.App.CORE = new loader(); // This will contain the most important methods
loader = require('/lib/rest');
Ti.App.REST = new loader(); // This will contain the client-server xhr methods 
loader = null; // Cleaning the variable for the GC
/*
 * Start Loading the Framework - END
 */
Ti.App.CORE.ini(); // Starting the Application