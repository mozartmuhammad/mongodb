var Addition = require('./Addition.js');
console.log(Addition.AddNumber(1,2));

var localTutor = require('./nodeTutorial.js');
var tut = new localTutor.NodeTutorial();  // Create and save object
tut.pTutor();  // Call function on object