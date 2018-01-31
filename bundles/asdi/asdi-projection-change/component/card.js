Oskari.clazz.define('Oskari.projection.change.component.card',
/**
 * @class 
 * @param { Object } view - contains info about the current view passed down to card
 * @param function() callback - callback function to call when element is clicked
 */
function (view, callback) {
    this.card = _.template('<div class="projection-card" data-srs="${srs}">'+
                        '<img class="card-image ${imgCls}"></img> '+
                        '<div class="info-row">'+
                            '<p class="card-header"> ${projectionName} </p>'+
                            '<div class="projection-info icon-info"></div>'+
                            '<div class="projection-warning" title="${tooltip}"></div>'+
                        '</div>'+
                        '</div>');
    this.element = null;
    this.loc = Oskari.getLocalization('projection-change');
    this.callback = callback;
    this.view = view;
    this.infoView = Oskari.clazz.create('Oskari.projection.change.view.ProjectionInformation', view);
    this.errorListing = Oskari.clazz.create('Oskari.projection.change.view.ErrorListing');
    if ( !this.getElement() )
    {
        this.create(view);
    }
}, {
    getElement: function () {
        return this.element;
    },
    setElement: function (el) {
        this.element = el;
    },
    create: function (view) {
        var me = this;

        var tpl = this.card;

        var card = jQuery( tpl ({
            srs: view.srsName,
            imgCls: view.imgCls,
            projectionName: view.name,
            tooltip: me.loc.error.hover.icon
        }));

        card.on('click', function () {
            me.callback( view.uuid,  view.srsName );
        });
        //infolink
        card.find('.projection-info').on('click', function ( event ) {
            event.stopPropagation();
            me.infoView.show( jQuery(this) );
        });
        //warningLink
        card.find('.projection-warning').on('click', function ( event ) {
            event.stopPropagation();
            me.errorListing.show( jQuery(this) );
        });

        this.setElement(card);
    }
}, {
});