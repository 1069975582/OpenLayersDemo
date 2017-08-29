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
            layers: 'basic'
        },
        {
            isBaseLayer: true
        }
    );
    // 将基础图层添加到map中
    map.addLayer(basic_layer);

    // 渲染器
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

    var vectorLayer = new OpenLayers.Layer.Vector("Simple Geometry", {
        styleMap: new OpenLayers.StyleMap({
           'default' : {
               strokeColor : "#00FF00",
               strokeOpacity : 1,
               StrokeWidth : 3,
               fillColor : "#FF5500",
               fillOpacity : 0.5,
               pointRadius : 6,
               pointEvents : "visiblePainted",
               label : "name: ${name}\n\nage: ${age}",

               fontColor : "${favColor}",
               fontSize : "12px",
               fontSize : "12px",
               fontFamily : "Courier New, monospace",
               fontWeiht : "bold",
               labelAlign : "${align}",
               labelXOffset : "${xOffset}",
               labelYOffset: "${yOffset}",
               labelOutlineColor: "white",
               labelOutlineWidth: 3
           } ,
        }),
        renderers : renderer
    });

    // 创建特征点
    var point = new OpenLayers.Geometry.Point(-111.04, 45.68); // 创建一个Point
    var pointFeature = new OpenLayers.Feature.Vector(point);
    pointFeature.attributes = {
        name : "toto",
        age : 20,
        favColor : 'red',
        align : "cm"
    };

    // 创建多边形特征点
    var pointList = [];
    // 随机生成多边形的点
    for(var p = 0; p < 9; p++) {
        var a = p * (2 * Math.PI) / 7;
        var r = Math.random(1) + 1;
        var newPoint = new OpenLayers.Geometry.Point(
            point.x + 5 + (r * Math.cos(a)),
            point.y + 5 + (r * Math.sin(a)));
        // 在这里将第0个点添加到List中是因为
        pointList.push(newPoint);
    }
    pointList.push(pointList[0]);
    // 使用LinearRing来生成闭环的多边形
    var linearRing = new OpenLayers.Geometry.LinearRing(pointList);
    var polygonFeature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Polygon([linearRing]));
            polygonFeature.attributes = {
                name: "dude",
                age: 21,
                favColor: 'purple',
                align: 'lb'
            };

    map.addLayer(vectorLayer);
    vectorLayer.addFeatures([pointFeature,polygonFeature]);
    map.setCenter(new OpenLayers.LonLat(-109.370078125, 43.39484375), 4);
    //map.zoomToMaxExtent();
}
