/*

*/


export default class GESettings {

    RESOLUTION = window.devicePixelRatio * 2;
    FORCE_LAYOUT_NODE_REPULSION_STRENGTH = -1000;
    FORCE_LAYOUT_ITERATIONS = 150;
    DEFAULT_LINK_LENGTH = 200;
    NODE_RADIUS = 10;
    NODE_HIT_RADIUS = this.NODE_RADIUS + 10;
    LABEL_FONT_FAMILY = 'Helvetica';
    LABEL_FONT_SIZE = 12;
    LABEL_X_PADDING = 5;
    LABEL_Y_PADDING = -5;


    NODE_DEFAULT_BORDER_COLOR = 0xf2f2f2;
    NODE_FOCUSED_NODE_BORDER_COLOR = 0xefefef;
    NODE_DEFAULT_ALPHA = 1;
    NODE_BORDER_HIGHLIGHT_ALPHA = 0.9;
    NODE_BORDER_UN_HIGHLIGHT_ALPHA = 0;

    NODE_SELECTED_STROKE_WIDTH = 10;

    LINK_DEFAULT_LABEL_FONT_SIZE = 10;
    LINK_DEFAULT_WIDTH = 2;
    LINK_DEFAULT_COLOR = 0x666666;
    LINK_DEFAULT_LABEL_COLOR = 0x545454;
    LINK_DEFAULT_ALPHA = 1;
    LINK_UN_HIGHLIGHT_ALPHA = 0.15;



    // ICON_FONT_FAMILY = 'Material Icons';
    ICON_FONT_FAMILY = 'Font Awesome 5 Free';
    ICON_FONT_SIZE = this.NODE_RADIUS / Math.SQRT2 * 2;
    ICON_TEXT = 'f542';

    ZOOM_CLAMP_MIN_SCALE = .2;
    ZOOM_CLAMP_MAX_SCALE = 3;

    NODE_MENU_X_PADDING =  50 + this.NODE_HIT_RADIUS;
    NODE_MENU_Y_PADDING = 45 + this.NODE_RADIUS;

    LABEL_RESOLUTION = 4;


    constructor(screenWidth, screenHeight) {
        if (screenWidth) {
            this.SCREEN_WIDTH = screenWidth;
        }
        if (screenHeight) {
            this.SCREEN_HEIGHT = screenHeight;
        }
        this.WORLD_WIDTH = this.SCREEN_WIDTH / 4;
        this.WORLD_HEIGHT = this.SCREEN_HEIGHT / 4;

        console.log(this.SCREEN_WIDTH, this.SCREEN_HEIGHT, this.WORLD_WIDTH, this.WORLD_HEIGHT)
    }


}
