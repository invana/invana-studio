/*
  https://github.com/MatheusAvellar/textarea-line-numbers
 */
const TLN = {
  eventList: {},
  update_line_numbers: function(ta, el) {
    // Let's check if there are more or less lines than before
    const line_count = ta.value.split("\n").length;
    const child_count = el.children.length;
    let difference = line_count - child_count;
    // If there is any positive difference, we need to add more line numbers
    if(difference > 0) {
      // Create a fragment to work with so we only have to update DOM once
      const frag = document.createDocumentFragment();
      // For each new line we need to add,
      while(difference > 0) {
        // Create a <span>, add TLN class name, append to fragment and
        // update difference
        const line_number = document.createElement("span");
        line_number.className = "tln-line";
        frag.appendChild(line_number);
        difference--;
      }
      // Append fragment (with <span> children) to our wrapper element
      el.appendChild(frag);
    }
    // If, however, there's negative difference, we need to remove line numbers
    while(difference < 0) {
      // Simple stuff, remove last child and update difference
      el.removeChild(el.lastChild);
      difference++;
    }
  },
  append_line_numbers: function(id) {
    // Get reference to desired <textarea>
    const ta = document.getElementById(id);
    // If getting reference to element fails, warn and leave
    if(ta == null) {
      return console.warn("[tln.js] Couldn't find textarea of id '"+id+"'");
    }
    // If <textarea> already has TLN active, warn and leave
    if(ta.className.indexOf("tln-active") != -1) {
      return console.warn("[tln.js] textarea of id '"+id+"' is already numbered");
    }
    // Otherwise, we're safe to add the class name and clear inline styles
    ta.classList.add("tln-active");
    ta.style = {};

    // Create line numbers wrapper, insert it before <textarea>
    const el = document.createElement("div");
    el.className = "tln-wrapper";
    ta.parentNode.insertBefore(el, ta);
    // Call update to actually insert line numbers to the wrapper
    TLN.update_line_numbers(ta, el);
    // Initialize event listeners list for this element ID, so we can remove
    // them later if needed
    TLN.eventList[id] = [];

    // Constant list of input event names so we can iterate
    const __change_evts = [
      "propertychange", "input", "keydown", "keyup"
    ];
    // Default handler for input events
    const __change_hdlr = function(ta, el) {
      return function(e) {
        // If pressed key is Left Arrow (when cursor is on the first character),
        // or if it's Enter/Home, then we set horizontal scroll to 0
        // Check for .keyCode, .which, .code and .key, because the web is a mess
        // [Ref] stackoverflow.com/a/4471635/4824627
        if((+ta.scrollLeft==10 && (e.keyCode==37||e.which==37
          ||e.code=="ArrowLeft"||e.key=="ArrowLeft"))
        || e.keyCode==36||e.which==36||e.code=="Home"||e.key=="Home"
        || e.keyCode==13||e.which==13||e.code=="Enter"||e.key=="Enter"
        || e.code=="NumpadEnter")
          ta.scrollLeft = 0;
        // Whether we scrolled or not, let's check for any line count updates
        TLN.update_line_numbers(ta, el);
      }
    }(ta, el);

    // Finally, iterate through those event names, and add listeners to
    // <textarea> and to events list
    /// TODO: Performance gurus: is this suboptimal? Should we only add a few
    /// listeners? I feel the update method is optimal enough for this to not
    /// impact too much things.
    for(let i = __change_evts.length - 1; i >= 0; i--) {
      ta.addEventListener(__change_evts[i], __change_hdlr);
      TLN.eventList[id].push({
        evt: __change_evts[i],
        hdlr: __change_hdlr
      });
    }

    // Constant list of scroll event names so we can iterate
    const __scroll_evts = [ "change", "mousewheel", "scroll" ];
    // Default handler for scroll events (pretty self explanatory)
    const __scroll_hdlr = function(ta, el) {
      return function() {  el.scrollTop = ta.scrollTop;  }
    }(ta, el);
    // Just like before, iterate and add listeners to <textarea> and to list
    /// TODO: Also just like before: performance?
    for(let i = __scroll_evts.length - 1; i >= 0; i--) {
      ta.addEventListener(__scroll_evts[i], __scroll_hdlr);
      TLN.eventList[id].push({
        evt: __scroll_evts[i],
        hdlr: __scroll_hdlr
      });
    }
  },
  remove_line_numbers: function(id) {
    // Get reference to <textarea>
    const ta = document.getElementById(id);
    // If getting reference to element fails, warn and leave
    if(ta == null) {
      return console.warn("[tln.js] Couldn't find textarea of id '"+id+"'");
    }
    // If <textarea> already doesn't have TLN active, warn and leave
    if(ta.className.indexOf("tln-active") == -1) {
      return console.warn("[tln.js] textarea of id '"+id+"' isn't numbered");
    }
    // Otherwise, remove class name
    ta.classList.remove("tln-active");

    // Remove previous sibling if it's our wrapper (otherwise, I guess 'woops'?)
    const __wrapper_chck = ta.previousSibling;
    if(__wrapper_chck.className == "tln-wrapper")
      __wrapper_chck.remove();

    // If somehow there's no event listeners list, we can leave
    if(!TLN.eventList[id]) return;
    // Otherwise iterate through listeners list and remove each one
    for(let i = TLN.eventList[id].length - 1; i >= 0; i--) {
      const evt = TLN.eventList[id][i];
      ta.removeEventListener(evt.evt, evt.hdlr);
    }
    // Finally, delete the listeners list for that ID
    delete TLN.eventList[id];
  }
}
export default TLN;