/*
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

const ADDON_ID = 'places-auto-vacuum-on-idle@clear-code.com';
const CLASS_ID = '{4bdc28aa-1031-4f51-881b-1c44fa4d43fd}';

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import('resource://gre/modules/XPCOMUtils.jsm');

function StartupService() { 
}
StartupService.prototype = {
	classDescription : ADDON_ID + '_StartupService', 
	contractID : '@'+ADDON_ID.split('@').reverse().join('/')+'/startup;1',
	classID : Components.ID(CLASS_ID),
	_xpcom_categories : [
		{ category : 'profile-after-change', service : true }
	],
	QueryInterface : XPCOMUtils.generateQI([Ci.nsIObserver]),

	observe : function(aSubject, aTopic, aData) 
	{
		switch (aTopic)
		{
			case 'profile-after-change':
				this.onStartup();
				return;
		}
	},

	onStartup : function()
	{
	}
};
var NSGetFactory = XPCOMUtils.generateNSGetFactory([StartupService]);
