window.addEventListener( 'message', ( json ) => {
    try {
        const event = JSON.parse( json.data );
        switch ( event.name ) {
            case 'setPlaygroundOverrides':
                window.playgroundOverrides = JSON.parse( event.data );
                break;
            case 'setPlaygroundBundleOverrides':
                window.playgroundBundlesOverrides = JSON.parse( event.data );
                break;
            case 'setPlaygroundAssetOverrides':
                window.playgroundAssetOverrides = JSON.parse( event.data );
                startGame();
                break;
            default:
        }
    } catch ( ex ) {
        // noop
    }
} );
