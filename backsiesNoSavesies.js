/*
 * backsiesNoSavesies.js 0.0.2
 * Paul Parker, http://github.com/paulCodes
 * backsiesNoSavesies.js is open sourced under the MIT license.
 * Portions of backsiesNoSavesies.js are inspired by Alphamale.
 * http://github.com/paulCodes/backsiesNoSavesies.js
 */
(function(window, document, undefined) {

    var BacksiesNoSavesies = function(changeSelectors, saveSelectors, ignoreSelectors, message) {
        this._unsaved = false;
        this._message = message || "Warning: You have unsaved changes on this page. If you leave your changes will be lost.";
        this._changeSelectors = changeSelectors || [":input"];
        this._saveSelectors = saveSelectors || ["button:submit"];
        this._ignoreSelectors = ignoreSelectors;
        this._debug = false;
        return 
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
     * @public
     * Sets a list of elements to ignore the changeSelectors inside
     */
    BacksiesNoSavesies.prototype.setIgnoreSelectors = function(selectors) {
        this._ignoreSelectors = selectors;

        // return this for chaining
        return this;
    };

    /*
     * @public
     * Sets unsaved
     */
    BacksiesNoSavesies.prototype.setUnsaved = function(unsaved, ele) {
        setUnsaved(unsaved, ele);

        // return this for chaining
        return this;
    };

    /*
     * @public
     * Sets debug flag on for nice logging.
     */
    BacksiesNoSavesies.prototype.debug = function(isDebug) {
        this._debug = isDebug;
        return this;
    } 

    BacksiesNoSavesies.prototype.ignoreElement = function(ele) {
        ele.unbind("change", setUnsaved(true, ele));
    }

    /*
     * @private
     * Sets the event hooks on page load
     */
    loadPage = function() {
        var c_selectors = this._changeSelectors;
        var s_selectors = this._saveSelectors;

        for (e in this._changeSelectors) {
            $(this._changeSelectors[e]).change(function(){
                setUnsaved(true, $(this))
            });
        }

        for (s in s_selectors) {
            $(s_selectors[s]).click(function() {
                setUnsaved(false, $(this));
            });
        }

        if (this._ignoreSelectors) {
            for (i in this._ignoreSelectors) {
                $(this._ignoreSelectors[i]).each(function(){
                    BacksiesNoSavesies.prototype.ignoreElement($( this ))
                });
            }
        }

        BacksiesNoSavesies.prototype.setUnsaved(false, this);
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

    /*
     * @private
     * Sets a the _unsaved flag
     */
    setUnsaved = function(unsaved, ele) {
        if (BacksiesNoSavesies.prototype.debug === true){
            console.log(ele);
            console.log(" is setting unsaved " + unsaved);
        }
        this._unsaved = unsaved;
    }

    window.onbeforeunload = unloadPage;
    window.onload = loadPage;
    window.BacksiesNoSavesies = BacksiesNoSavesies;

})(window, document);
