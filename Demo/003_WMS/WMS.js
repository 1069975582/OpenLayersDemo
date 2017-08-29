/**
 * Created by echo on 2017/8/29.
 */

function init() {
   var map = new OpenLayers.Map("map",{});
    // 创建基础图层
    var baseLayer = new OpenLayers.Layer.WMS(
        'OpenLayers WMS',
        'http://vmap0.tiles.osgeo.org/wms/vmap0',
        {layers: 'basic'},
        {
            // 是否是基础图层
            isBaseLayer:true
        }
    );
    // 显示label的图层
    var wms_layers_label = new OpenLayers.Layer.WMS(
        'Label Layer',
        'http://vmap0.tiles.osgeo.org/wms/vmap0',
        {
            layers:'clabel,ctylabel,statelabel',
            // WMS 默认设置为baseLayer,因此，如果不是baseLayer，将transparent设置为true，可去掉此设置自行体会一下
            transparent: true
        },
        {
            // 图层透明度
            opacity:0.5
        }
    );

    // 将图层添加至map中
    map.addLayers([baseLayer,wms_layers_label]);

    /**
     * 添加地图空间 Layer Switcher,图层选择器
     */
    map.addControl(new OpenLayers.Control.LayerSwitcher({}));

    /**
     * 设置地图显示区域，如果没有要求，可以使用 map.zoomToMaxExtent();
     * 如果需要将地图显示到指定的区域：
     * 可以使用以下方法：
     * lon 经度   lat 纬度
     * map.setCenter(new OpenLayers.LonLat(lon, lat)) // 自己指定lon,lat的值
     * map.zoomTo(5) // 定义地图缩放等级
     *或者
     * map.zoonToExtent(new OpenLayers.Bounds([minX,minY,maxX,maxY)) // 设置需要显示的区域
     */

    // 设置显示中心
    //map.setCenter(new OpenLayers.LonLat(116,39));
    //map.zoomTo(7); // 设置缩放级别

    // 设置一个显示的边界，采用经纬度确定一个矩形进行显示
    map.zoomToExtent(new OpenLayers.Bounds([116,39,130,50]));
}