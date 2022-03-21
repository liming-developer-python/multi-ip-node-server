const publishTestData = false;
const { PubSub } = require('@google-cloud/pubsub'); // Imports the Google Cloud client library
const pubSubClient = new PubSub();                    // Creates a PubSub client
const topicName = 'pf6000-telemetry-data';         // PubSub topic name

const controllerConMsg = 'Connected, MID0002';
const httpSuccessMsg = 'IOT data is published into PubSub topic, ' + topicName;
const httpFailedMsg = 'IOT data publishing error; PubSub topic, ' + topicName;
const sessionCtrlClose = '[Event][SessionControl][onClose]';
const sessionCtrlError = '[Event][SessionControl][onError]';
const openProtocol = require('node-open-protocol');
class iotDeviceLister {

    constructor(controllerPORT, controllerIP, optsSessionControl) {
        this.controllerPORT = controllerPORT;
        this.controllerIP = controllerIP;
        this.optsSessionControl = optsSessionControl;
        this.RegisterEvent();

    }

    RegisterEvent() {
        this.client = openProtocol.createClient(this.controllerPORT, this.controllerIP, this.optsSessionControl, (data) => {
            console.log(controllerConMsg, JSON.stringify(data));

            this.client.subscribe("lastTightening", (err, data) => {
                if (err) {
                    return console.log("Error on Subscribe", err);
                }
                console.log("Subscribed!, waiting for the operator to tighten");

                startTightening(1, "ASDEDCUHBG34563EDFRCVGFR6");
            });
        });
        
        this.client.on("error", (err) => {
            console.log(sessionCtrlError, err);
            process.exitCode = 1;
        });

        this.client.on("close", (err) => {
            console.log(sessionCtrlClose, err);
        });

        this.client.on("lastTightening", (iotData) => {
            console.log("Tightening received!", JSON.stringify(iotData));
            const dataBuffer = Buffer.from(JSON.stringify(iotData));
            try {
                const messageId = pubSubClient.topic(topicName).publish(dataBuffer);
                console.log(httpSuccessMsg + ' ' + messageId);
            } catch (error) {
                console.error(httpFailedMsg + ' ' + error.message);
                process.exitCode = 1;
            }
            // Respond to HTTP request with message and result scode
            {/*
            if (process.exitCode == 0) {
                res.status(200).send(req.query.message || req.body.message || httpSuccessMsg);
            }
            else {
                res.status(408).send(httpFailedMsg);
            }
        */}
        });

        function startTightening(parameterSetID, numberVIN) {
            // --> Abort Job --> Select Pset --> Set VehicleId --> Disable Tool --> Enable Tool

            this.client.command("abortJob", (err) => {
                if (err) {
                    return console.log("Fail on abortJob", err);
                }

                this.client.command("selectPset", { payload: { parameterSetID } }, (err) => {

                    if (err) {
                        return console.log("Fail on selectPset", err);
                    }

                    this.client.command("vinDownload", { payload: { numberVIN } }, (err) => {

                        if (err) {
                            return console.log("Fail on vinDownload", err);
                        }

                        this.client.command("disableTool", (err, data) => {

                            if (err) {
                                return console.log("Fail on disableTool", err);
                            }

                            this.client.command("enableTool", (err, data) => {

                                if (err) {
                                    return console.log("Fail on enableTool", err);
                                }

                                console.log("waiting for the operator to tighten");
                            });
                        });
                    });
                });
            });
        }
    }
}

module.exports = {
    iotDeviceLister: iotDeviceLister
};