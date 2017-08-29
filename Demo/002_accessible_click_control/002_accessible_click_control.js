/**
 * Created by echo on 2017/8/29.
 * 002_accessible_click_control JSÎÄ¼þ
 */


var map,navigationControl,queryControl;

function init() {
    map = new OpenLayers.Map('map',{controls:[]});
    var layer = new OpenLayers.Layer.WMS(
        'OpenLayers WMS',
        'http://vmap0.tiles.osgeo.org/wms/vmap0',
        {layers: 'basic'},
        {}
    );
    map.addLayer(layer);

    navigationControl = new OpenLayers.Control.KeyboardDefaults({
        observeElement: 'map'
    });
    map.addControl(navigationControl);

    queryControl = new OpenLayers.Control.KeyboardClick({
        observeElement: 'map'
    });
    map.addControl(queryControl);
    map.zoomToMaxExtent();
}

OpenLayers.Control.KeyboardClick = OpenLayers.Class(OpenLayers.Control, {
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this,[options]);
        var observeElement = this.observeElement || document;
        this.handler = new OpenLayers.Handler.KeyboardPoint(this, {
            done: this.onClick,
            cancel: this.deactivate()
        },{
            observeElement: observeElement
        });

        OpenLayers.Event.observe(
            observeElement,
            "keydown",
            OpenLayers.Function.bindAsEventListener(
                function(evt) {
                    if(evt.keyCode == 73) {
                        this.deactivate();
                    } else {
                        this.activate();
                    }
            },this)
        );
    },

    onclick: function(geometry) {
        alert("µã»÷" + geometry.x + "N, " + geometry.y + "E");
    },

    activate: function() {
        if(!OpenLayers.Control.prototype.activate.apply(this, arguments)) {
            return false;
        }
        // deactivate any KeyboardDefaults control
        var keyboardDefaults = this.map.getControlsByClass(
            'OpenLayers.Control.KeyboardDefaults')[0];
        if (keyboardDefaults) {
            keyboardDefaults.deactivate();
        }
        return true;
    },

    deactivate: function() {
        if(!OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
            return false;
        }
        // reactivate any KeyboardDefaults control
        var keyboardDefaults = this.map.getControlsByClass(
            'OpenLayers.Control.KeyboardDefaults')[0];
        if (keyboardDefaults) {
            keyboardDefaults.activate();
        }
        return true;
    }
});

OpenLayers.Handler.KeyboardPoint = OpenLayers.Class(OpenLayers.Handler, {
    KEY_EVENT: ["keydown"],

    initliaze: function(control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        this.eventListener = OpenLayers.Function.bindAsEventListener(
            this.handleKeyEvent, this
        );
    },
    activate: function() {
        if(!OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            return false;
        }
        this.layer = new OpenLayers.Layer.Vector(this.CLASS_NAME);
        this.map.addLayer(this.layer);
        this.observeElement = this.observeElement || document;
        for (var i=0, len=this.KEY_EVENTS.length; i<len; i++) {
            OpenLayers.Event.observe(
                this.observeElement, this.KEY_EVENTS[i], this.eventListener);
        }
        if(!this.point) {
            this.createFeature();
        }
        return true;
    },

    deactivate: function() {
        if (!OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            return false;
        }
        for (var i=0, len=this.KEY_EVENTS.length; i<len; i++) {
            OpenLayers.Event.stopObserving(
                this.observeElement, this.KEY_EVENTS[i], this.eventListener);
        }
        this.map.removeLayer(this.layer);
        this.destroyFeature();
        return true;
    },

    handleKeyEvent: function (evt) {
        switch(evt.keyCode) {
            case OpenLayers.Event.KEY_LEFT:
                this.modifyFeature(-3, 0);
                break;
            case OpenLayers.Event.KEY_RIGHT:
                this.modifyFeature(3, 0);
                break;
            case OpenLayers.Event.KEY_UP:
                this.modifyFeature(0, 3);
                break;
            case OpenLayers.Event.KEY_DOWN:
                this.modifyFeature(0, -3);
                break;
            case OpenLayers.Event.KEY_RETURN:
                this.callback('done', [this.point.geometry.clone()]);
                break;
            case OpenLayers.Event.KEY_ESC:
                this.callback('cancel');
                break;
        }
    },

    modifyFeature: function(lon, lat) {
        if(!this.point) {
            this.createFeature();
        }
        var resolution = this.map.getResolution();
        this.point.geometry.x = this.point.geometry.x + lon * resolution;
        this.point.geometry.y = this.point.geometry.y + lat * resolution;
        this.callback("modify", [this.point.geometry, this.point, false]);
        this.point.geometry.clearBounds();
        this.drawFeature();
    },

    createFeature: function() {
        var center = this.map.getCenter();
        var geometry = new OpenLayers.Geometry.Point(
            center.lon, center.lat
        );
        this.point = new OpenLayers.Feature.Vector(geometry);
        this.callback("create", [this.point.geometry, this.point]);
        this.point.geometry.clearBounds();
        this.layer.addFeatures([this.point], {silent: true});
    },

    destroyFeature: function() {
        this.layer.destroyFeatures([this.point]);
        this.point = null;
    },

    drawFeature: function() {
        this.layer.drawFeature(this.point, this.style);
    }
});