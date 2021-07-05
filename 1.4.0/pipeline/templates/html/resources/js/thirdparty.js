window.Luna = {
    Unity: {
        Playable: {},

        LifeCycle: {
            OnStart: function() {},
            OnDeviceData: function() {},
            GameEnded: function() {},
            HapticTriggered: function() {},
            OnMute: function() {},
            OnUnmute: function() {},
            OnPause: function() {},
            OnResume: function() {},
            OnResize: function() {},
            OnLevelLoad: function() {},
        },

        Analytics: {},

        Nucleo: {},

        Playground: {
            get: function( className, fieldName, defaultValue, format ) {
                if ( !window.playgroundOverrides ||
                     !window.playgroundOverrides.hasOwnProperty( className ) ||
                     !window.playgroundOverrides[ className ].hasOwnProperty( fieldName ) ) {
                    return defaultValue;
                }

                const value = window.playgroundOverrides[ className ][ fieldName ];

                switch ( value[ 0 ] ) {
                    case 'float':
                    case 'int':
                    case 'string':
                    case 'enum':
                        return value[ 1 ];

                    case 'boolean':
                        return !!value[ 1 ];

                    case 'vector2':
                    case 'vector3':
                    case 'vector4':
                        return value.slice( 1 );

                    case 'color':
                        if ( format === 'rgba' ) {
                            const r = ( ( value[ 1 ] * 255 ) | 0 ).toString( 16 );
                            const g = ( ( value[ 2 ] * 255 ) | 0 ).toString( 16 );
                            const b = ( ( value[ 3 ] * 255 ) | 0 ).toString( 16 );
                            const a = ( ( value[ 4 ] * 255 ) | 0 ).toString( 16 );

                            return '#' +
                                ( r.length < 2 ? '0' : '' ) + r +
                                ( g.length < 2 ? '0' : '' ) + g +
                                ( b.length < 2 ? '0' : '' ) + b +
                                ( a.length < 2 ? '0' : '' ) + a;
                        } else {
                            return value.slice( 1 );
                        }
                    default: return null;
                }
            },
        },
    },
};

window.Bridge = { ready: function( callback ) { callback(); } };
