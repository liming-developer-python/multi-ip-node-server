const { iotDeviceListnerBuilder } = require('./iot-device-listener-builder');
/**
* Responds to any HTTP request.
*
* @param {!express:Request} req HTTP request context.
* @param {!express:Response} res HTTP response context.
*/
let Ips = [{ controllerIP: "127.0.0.1", controllerPORT: "4000" },{ controllerIP: "127.0.0.2", controllerPORT: "4000" },{ controllerIP: "127.0.0.3", controllerPORT: "4000" },{ controllerIP: "127.0.0.4", controllerPORT: "4000" } ]
let createdIpIntances = [];
exports.livetightening = (req, res) => {
  _livetightening(res, req);
  // const publishTestData = false;
  // const { PubSub } = require('@google-cloud/pubsub'); // Imports the Google Cloud client library
  // const pubSubClient = new PubSub();                    // Creates a PubSub client
  // const topicName = 'pf6000-telemetry-data';         // PubSub topic name

  // const controllerConMsg = 'Connected, MID0002';
  // const httpSuccessMsg = 'IOT data is published into PubSub topic, ' + topicName;
  // const httpFailedMsg = 'IOT data publishing error; PubSub topic, ' + topicName;
  // const sessionCtrlClose = '[Event][SessionControl][onClose]';
  // const sessionCtrlError = '[Event][SessionControl][onError]';

  // process.exitCode = 0;

  // //if (publishTestData != true) {
  // // IOT Device protocol, session setup
  // const openProtocol = require('node-open-protocol');
  // let controllerIP = "127.0.0.1";
  // let controllerPORT = 4000;


  // let optsSessionControl = {
  //   //Configuring Session Control
  //   defaultRevisions: undefined,  // {"mid": rev, "mid": rev}
  //   linkLayerActivate: undefined, // true activate / false not activate / undefined autoNegotiation
  //   genericMode: false,           // true activate / false ou undefined not activate 
  //   keepAlive: 10000,             // Number, default 10000

  //   //Configuring LinkLayer
  //   rawData: false,               // true activate / false ou undefined not activate
  //   disableMidParsing: undefined, // true activate / false ou undefined not activate
  //   timeOut: 3000,                // Number, default 3000
  //   retryTimes: 3                 // Number, default 3
  // };

  // let sc = connect();

  // function connect() {
  //   return openProtocol.createClient(controllerPORT, controllerIP, optsSessionControl, (data) => {
  //     console.log(controllerConMsg, JSON.stringify(data));
  //   });
  // }

  // sc.subscribe("lastTightening", (err, data) => {
  //   if (err) {
  //     return console.log("Error on Subscribe", err);
  //   }
  //   console.log("Subscribed!, waiting for the operator to tighten");
  // });

  // sc.on("error", (err) => {
  //   console.log(sessionCtrlError, err);
  //   process.exitCode = 1;
  // });

  // sc.on("close", (err) => {
  //   console.log(sessionCtrlClose, err);
  // });

  // sc.on("lastTightening", (iotData) => {
  //   console.log("Tightening received!", JSON.stringify(iotData));
  //   const dataBuffer = Buffer.from(JSON.stringify(iotData));
  //   try {
  //     const messageId = pubSubClient.topic(topicName).publish(dataBuffer);
  //     console.log(httpSuccessMsg + ' ' + messageId);
  //   } catch (error) {
  //     console.error(httpFailedMsg + ' ' + error.message);
  //     process.exitCode = 1;
  //   }
  //   // Respond to HTTP request with message and result scode
  //   if (process.exitCode == 0) {
  //     res.status(200).send(req.query.message || req.body.message || httpSuccessMsg);
  //   }
  //   else {
  //     res.status(408).send(httpFailedMsg);
  //   }
  // });
};


const _livetightening = (req, res) => {
  Ips.forEach(ip => {
    try {
      console.log(`creating connection for ${ip.controllerIP}:${ip.controllerPORT}`)
      let idlb = new iotDeviceListnerBuilder(ip.controllerPORT, ip.controllerIP);
      let idl = idlb.build();
      createdIpIntances.push(idl);
    }
    catch (err) {
      console.error(`Error in making connection for ${ip.controllerIP}:${ip.controllerPORT}`, err);
    }
  });
};

_livetightening();
setInterval(() => console.log('app is running'), 30000);