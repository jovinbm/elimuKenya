# elimuKenya

To use this project, you (or the Raspberry Pi) need to have node.js and npm installed. The structure consists of a sample independent website that runs at port 3000. The other file is a sample caching server that will (as of project specification) run on the Raspberry Pi. (Though It could still be run locally for testing)

#How it works

How it works To test, clone the github repository at https://github.com/jovinbm/elimuKenya, navigate to it through your terminal and run the command sudo npm install (Make sure node.js and npm are installed)

The sample server runs continuously on the Raspberry Pi, listening to any network requests. Ideally, http & https requests will be routed from port 80/443 to port 4000 on which the caching server runs. This listens to any requests, and looks on it's local storage first. If the file is not found, it is requested from the real server, (the caching server sends this request and waits for the response). When there is a response, the caching server caches the file on the raspberries file system,(this may be a html, css, javascript, xml, json, php) and responds to the client with this file. Any other similar requests will be served without contacting the server. This reduces the data use significantly.

#Where it still needs work

Currently, audio and videos are not cached, as this would significantly reduce the performance and storage of the Raspberry Pi (Long I/O operation)
