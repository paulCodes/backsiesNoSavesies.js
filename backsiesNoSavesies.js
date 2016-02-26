/*
 * backsiesNoSavesies.js 0.0.1
 * Paul Parker, http://github.com/paulCodes
 * backsiesNoSavesies.js is open sourced under the MIT license.
 * Portions of backsiesNoSavesies.js are inspired by Alphamale.
 * http://github.com/paulCodes/backsiesNoSavesies.js
 */
(function(window, document, undefined) {

	var BacksiesNoSavesies = function(changeSelectors, saveSelectors, message) {
		this._unsaved = false;
		this._message = message || "Warning: You have unsaved changes on this page. If you leave your changes will be lost.";
		this._changeSelectors = changeSelectors || [":input"];
		this._saveSelectors = saveSelectors || ["button:submit"];
	}

  	/*
     * @public
     * Sets a custom message for the warning
     */
    BacksiesNoSavesies.prototype.setMessage = function(message) {
        this._message = message;

        // return this for chaining
        return this;
    };

    /*
     * @private
     * Sets a the event hooks on page load
     */
	loadPage = function() {
		for (e in this._changeSelectors) {
			$(this._changeSelectors[e]).change(function(){ 
				_unsaved = true;
	       	});
		}

		for (s in this._saveSelectors) {
			$(this._saveSelectors[s]).click(function() {
				_unsaved = false;
			});
		}
	}

	/*
     * @private
     * Sets a the event hooks on page unload
     */
	unloadPage = function() { 
	    if(this._unsaved){
	        return this._message;
	    }
	}

	window.onbeforeunload = unloadPage;
	window.onload = loadPage;
	window.BacksiesNoSavesies = BacksiesNoSavesies;

})(window, document);
