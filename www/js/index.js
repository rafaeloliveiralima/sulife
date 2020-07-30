/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
		checkSMSPermission: function() {
        var success = function (hasPermission) { 
            if (hasPermission) {
				var number = '+5521980327479' /* iOS: ensure number is actually a string */
				var message = 'TESTE DE ENVIO DE SMS';
				alert("number=" + number + ", message= " + message);
		 
				//CONFIGURATION
				var options = {
					replaceLineBreaks: false, // true to replace \n by a new line, false by default
					android: {
						intent: 'INTENT'  // send SMS with the native android SMS messaging
						//intent: '' // send SMS without opening any other app
					}
				};
		 
				var success = function () { alert('Message sent successfully'); };
				var error = function (e) { alert('Message Failed:' + e); };
				sms.send(number, message, options, success, error);
				//sms.send(...);
            }
            else {
				alert('sem permissao');
                // show a helpful message to explain why you need to require the permission to send a SMS
                // read http://developer.android.com/training/permissions/requesting.html#explain for more best practices
            }
        };
        var error = function (e) { alert('Something went wrong:' + e); };
        sms.hasPermission(success, error);
    },
    requestSMSPermission: function() {
        var success = function (hasPermission) { 
            if (!hasPermission) {
                sms.requestPermission(function() {
                    alert('[OK] Permission accepted')
                }, function(error) {
                    alert('[WARN] Permission not accepted')
                    // Handle permission not accepted
                })
            }
        };
        var error = function (e) { alert('Something went wrong:' + e); };
        sms.hasPermission(success, error);
    },
	
    initialize: function() {
		alert('1');
        this.bindEvents();
		this.checkSMSPermission();
		alert('2');
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
