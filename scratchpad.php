<?php
/*
 * Plugin Name: Scratchpad
 * Plugin URI: http://example.com/scratchpad
 * Description: Scratchpad for next to your post
 * Author: Cornell FBOA
 * Version: 0.1
 * Author URI: http://example.com/make-scratchpad
 */


/* Fire our meta box setup function on the post editor screen. */
add_action( 'load-post.php', 'scratchpad_setup' );
add_action( 'load-post-new.php', 'scratchpad_setup' );

/* Meta box setup function. */
function scratchpad_setup() {

    /* Add meta boxes on the 'add_meta_boxes' hook. */
    add_action( 'add_meta_boxes', 'scratchpad_add' );
}

/* Create one or more meta boxes to be displayed on the post editor screen. */
function scratchpad_add() {

    add_meta_box( 'scratchpad', 'Scratchpad', 'scratchpad_post_callback',
        'post', $context = 'side', $priority = 'default', $callback_args = null );

}


/* Display the post meta box. */
function scratchpad_post_callback( $object, $box ) { ?>

    <?php wp_nonce_field( basename( __FILE__ ), 'scratchpad_nonce' ); ?>

    <p>
        <label for="scratchpad-class"><?php _e( "Use this as a scratchpad for composing your post"); ?></label>
        <br />
        <textarea class="widefat" type="text" name="scratchpad-class" id="scratchpad-class" value="<?php echo esc_attr( get_post_meta( $object->ID, 'scratchpad-class', true ) ); ?>" rows="15" ></textarea>
    </p>
<?php }


?>