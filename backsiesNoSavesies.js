/*
 * backsiesNoSavesies.js
 *
 * @version 0.0.3
 * @author Paul Parker, http://github.com/paulCodes
 * @requires jquery
 *
 * backsiesNoSavesies.js is open sourced under the MIT license.
 * Portions of backsiesNoSavesies.js are inspired by Alphamale.
 * http://github.com/paulCodes/backsiesNoSavesies.js
 */
;(function ($) {

    $.backsies = function (options) {

        var opts = $.extend({}, $.backsies.defaults, options);
        init(opts);
        return this.each(function () {

        });
    };

    /*
     *  Sets the backsies event hooks
     *  @param {object} options for backsies
     */
    function init(opts) {
        // var changes = $(opts.changes.toString());
        // var saves = $(opts.saves.toString());
        // var resets = $(opts.resets.toString());
        // var ingores = $(opts.ignores.toString());

        $.each(opts.changes, function (key, value) {
            $(value).on("change.backsies", function() {setUnsaved(true, value)});
        });
        $.each(opts.saves, function (key, value) {
            $(value).off(".backsies");
            $(value).on("change.backsies", function() {setUnsaved(false, value)});
            $(value).on("click.backsies", function() {setUnsaved(false, value)});
        });
        $.each(opts.resets, function (key, value) {
            $(value).off(".backsies");
            $(value).on("change.backsies", function() {setUnsaved(false, value)});
            $(value).on("click.backsies", function() {setUnsaved(false, value)});
        });
        $.each(opts.ignores, function (key, value) {
            $(value).off(".backsies");
        });

        $(document).data("backsies.unsaved", opts.unsaved);
        $.backsies.debug = opts.debug;
        $(window).on("beforeunload", function () {
            if ($(document).data("backsies.unsaved")) {
                return opts.message;
            }
        });
    }

    /*
     * Sets a the unsaved flag
     * @param {bool} unsaved - value for unsaved flag, defaults to true
     * @param {jQuery object} elem - element that fired the event
     */
    function setUnsaved(unsaved, elem) {
        if ($.backsies.debug) {
            console.log(elem);
            console.log(" is setting unsaved " + unsaved);
        }
        window.unsaved = unsaved;
        $(document).data("backsies.unsaved", unsaved);
    }

    /*
     * manually set the unsaved flag
     * @param {Optional bool} unsaved - value to set unsaved flag. default is true
     */
    $.backsies.setUnsaved = function (unsaved) {
        setUnsaved(unsaved);
    };

    /*
     * applies backsies on change event listeners
     * @param {jQuery object} elem - the element that backsies will bind the event listener
     * @param {Optional bool} unsaved - value to set unsaved flag when the event fires. default is true
     */
    $.backsies.watchEle = function (elem, unsaved) {
        elem.off(".backsies");
        elem.on("change.backsies", setUnsaved(unsaved, elem));
    };

    /*
     * removes all of the backsies event listeners
     * @param {jQuery object} elem - the element that will all backsies listeners removed
     */
    $.backsies.ignoreEle = function (elem) {
        elem.off(".backsies");
    };

    $.backsies.defaults = {
        unsaved: false,
        message: "Warning: You have unsaved changes on this page. If you leave your changes will be lost.",
        changes: [":input"],
        saves: ["button:submit"],
        resets: ["button:cancel"],
        ignores: [],
        debug: false
    };

})(jQuery);
