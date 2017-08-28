/**
 * OpenLayers操作JS
 * Created by echo on 2017/8/28.
 */


/**
 * 初始化函数，对OpenLayers进行初始化
 * 步骤：
 *  1.使用new OpenLayers.Map('map',options);生成一个map
 *  2.new OpenLayers.Layer.WMS()生成一个wms图层
 *  3.map.addLayer(wms); 将wms图层添加到地图中
 *  4.map.zoomToMaxExtent(); 设置地图显示的部分
 */
var map = null;
function init() {
    // map配置参数
    var options = {
        controls:[
            // 控制器，设置默认键盘事件
            new OpenLayers.Control.KeyboardDefaults({
                observeElement:'map'
            })
        ]
    };
    map = new OpenLayers.Map('map',options);
    var wms = new OpenLayers.Layer.WMS(
        "OpenLayers WMS",
        "http://vmap0.tiles.osgeo.org/wms/vmap0?",
        {layers: 'basic'}
    );
    // 添加图层到map中
    map.addLayer(wms);
    // 地图缩放程度最大后重定位
    map.zoomToMaxExtent();
}