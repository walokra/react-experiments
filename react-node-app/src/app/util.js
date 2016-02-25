export default {

    /**
     * Creates a template with color based on type.
     * http://oskari.org/documentation/requests/addmarkerrequest
     * @param  {String} type 'road', 'env' or undefined
     * @return {Object} template definition for markers
     */
    getMarkerTemplate: function(type) {
        return {
            id: 0,
            x: 0,
            y: 0,
            size: 4,
            shape: 2,
            color: this.getColor(type)
        };
    },

    getColor: function(type) {
        return '00FF00';
    }

};


