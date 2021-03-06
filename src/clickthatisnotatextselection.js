/*
 * jQuery special event clickthatisnotatextselection
 * https://github.com/FGRibreau/jquery-clicthatisnotatextselection
 *
 * Copyright (c) 2012 Francois-Guillaume Ribreau
 * Licensed under the MIT, GPL licenses.
 */

(function($){
  /**
   * @return {Boolean} Return true of a text is currently selected
   */
  function isTextSelected () {
    if(document.getSelection || window.getSelection) {
      var sel = document.getSelection ? document.getSelection() : window.getSelection();
      return sel.type === 'Range';
    }

    var selection = document.selection && document.selection.createRange();
    if(selection.text) {
      return selection.text.length > 0;
    }

    // Otherwise we don't know, return true
    return true;
  }

  function onClick(cb) {
    return function(){
      if(!isTextSelected()){
        cb();
      }
    };
  }

  /**
   * Usage:
   * $('#el').on('clickThatIsNotATextSelection', function(){
   *   console.log("This event does not come from a text selection");
   * });
   * @type {Object}
   */
  $.event.special.clickThatIsNotATextSelection = {
    // Do something each time an event handler is bound to a particular element.
    add: function( handleObj ) {
      $(this).on('click.ctinats'+handleObj.guid, onClick(handleObj.handler));
    },

    // Do something each time an event handler is unbound from a particular element.
    remove: function( handleObj ) {
      $(this).off('click.ctinats'+handleObj.guid);
    }
  };

}(jQuery));
