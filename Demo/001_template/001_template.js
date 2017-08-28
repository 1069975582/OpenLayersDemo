/**
 * OpenLayers����JS
 * Created by echo on 2017/8/28.
 */


/**
 * ��ʼ����������OpenLayers���г�ʼ��
 * ���裺
 *  1.ʹ��new OpenLayers.Map('map',options);����һ��map
 *  2.new OpenLayers.Layer.WMS()����һ��wmsͼ��
 *  3.map.addLayer(wms); ��wmsͼ����ӵ���ͼ��
 *  4.map.zoomToMaxExtent(); ���õ�ͼ��ʾ�Ĳ���
 */
var map = null;
function init() {
    // map���ò���
    var options = {
        controls:[
            // ������������Ĭ�ϼ����¼�
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
    // ���ͼ�㵽map��
    map.addLayer(wms);
    // ��ͼ���ų̶������ض�λ
    map.zoomToMaxExtent();
}