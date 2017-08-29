/**
 * Created by echo on 2017/8/29.
 */

/**
 * 页面载入完成时调用此函数，对地图进行初始化
 */
function init() {
    // 新建一个map对象
    var map = new OpenLayers.Map('map',{});
    // 创建一个基础图层
    var basic_layer = new OpenLayers.Layer.WMS(
        'basic Layer',
        'http://vmap0.tiles.osgeo.org/wms/vmap0',
        {
            layer: 'basic'
        },
        {
            isBaseLayer: true
        }
    );

    // 渲染器
    var renderer = OpenLayers.Util.getParameters(Window.location.href).render;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderer;

    var VectorLayer = new OpenLayers.Layer.Vector("simple Geometry", {
        styleMap: new OpenLayers.StyleMap({
           'default' : {
               strokeColor : "#00FF00",
               strokeOpacity : 1,
               StrokeWidth : 3,
               fillColor : "#FF5500",
               fillOpacity : 0.5,
               pointRadius : 6,
               pointEvents : "visiblePainted",
               label : "name: $(name)\n\nage: $(age)",

               fontColor : "$(favColor)",
               fontSize : "12px",
               fontSize : "12px",
               fontFamily : "Courier New, monospace",
               fontWeiht : "bold",
               labelAlign : "$(align)",
               labelXOffset : "$(xOffset)",
               labelYOffset: "${yOffset}",
               labelOutlineColor: "white",
               labelOutlineWidth: 3
           } ,
        }),
        renderers : renderer
    });

    // 创建特征点
    var point = new OpenLayers.Geometry.Point(-111.04, 45.68); // 创建一个Point
    var pointFeatures = new OpenLayers.Feature.Vector(point);
    pointFeatures.attributes = {
        name : "toto",
        age : 20,
        favColor : 'red',
        align : "cm"
    }
}