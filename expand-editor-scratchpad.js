/**
 * Created by kristin on 2/1/15.
 * Scratchpad Expand editor
 */
/**
 * Overrides editor-expand.js
 * Hovering or clicking outside the editor in Distraction free mode does not fadeIn()
 **/
function fadeOut( event ) {
    var key = event && event.keyCode;

    // fadeIn and return on Escape and keyboard shortcut Alt+Shift+W.
    if ( key === 27 || ( key === 87 && event.altKey && event.shiftKey ) ) {
        fadeIn( event );
        return;
    }

    if ( event && ( event.metaKey || ( event.ctrlKey && ! event.altKey ) || ( event.altKey && event.shiftKey ) || ( key && (
            // Special keys ( tab, ctrl, alt, esc, arrow keys... )
        ( key <= 47 && key !== 8 && key !== 13 && key !== 32 && key !== 46 ) ||
            // Windows keys
        ( key >= 91 && key <= 93 ) ||
            // F keys
        ( key >= 112 && key <= 135 ) ||
            // Num Lock, Scroll Lock, OEM
        ( key >= 144 && key <= 150 ) ||
            // OEM or non-printable
        key >= 224
        ) ) ) ) {
        return;
    }

    if ( ! faded ) {
        faded = true;

        clearTimeout( overlayTimer );

        overlayTimer = setTimeout( function() {
            $overlay.show();
        }, 600 );

        $editor.css( 'z-index', 9998 );

        $overlay
            // Always recalculate the editor area entering the overlay with the mouse.
            .on( 'mouseenter.focus', function() {
                recalcEditorRect();

                $window.on( 'scroll.focus', function() {
                    var nScrollY = window.pageYOffset;

                    scrollY = nScrollY;
                } );
            } )
            .on( 'mouseleave.focus', function() {
                x = y =  null;
                traveledX = traveledY = 0;

                $window.off( 'scroll.focus' );
            } )

            // When the overlay is touched, always fade in and cancel the event.
            .on( 'touchstart.focus', function( event ) {
                event.preventDefault();
                fadeIn();
            } );

        $editor.off( 'mouseenter.focus' );

        if ( focusLostTimer ) {
            clearTimeout( focusLostTimer );
            focusLostTimer = null;
        }

        $body.addClass( 'focus-on' ).removeClass( 'focus-off' );
    }

    fadeOutAdminBar();
    fadeOutSlug();
}
