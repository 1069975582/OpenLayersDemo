/**
 * Created by echo on 2017/8/29.
 */

function init() {
   var map = new OpenLayers.Map("map",{});
    // ��������ͼ��
    var baseLayer = new OpenLayers.Layer.WMS(
        'OpenLayers WMS',
        'http://vmap0.tiles.osgeo.org/wms/vmap0',
        {layers: 'basic'},
        {
            // �Ƿ��ǻ���ͼ��
            isBaseLayer:true
        }
    );
    // ��ʾlabel��ͼ��
    var wms_layers_label = new OpenLayers.Layer.WMS(
        'Label Layer',
        'http://vmap0.tiles.osgeo.org/wms/vmap0',
        {
            layers:'clabel,ctylabel,statelabel',
            // WMS Ĭ������ΪbaseLayer,��ˣ��������baseLayer����transparent����Ϊtrue����ȥ���������������һ��
            transparent: true
        },
        {
            // ͼ��͸����
            opacity:0.5
        }
    );

    // ��ͼ�������map��
    map.addLayers([baseLayer,wms_layers_label]);

    /**
     * ��ӵ�ͼ�ռ� Layer Switcher,ͼ��ѡ����
     */
    map.addControl(new OpenLayers.Control.LayerSwitcher({}));

    /**
     * ���õ�ͼ��ʾ�������û��Ҫ�󣬿���ʹ�� map.zoomToMaxExtent();
     * �����Ҫ����ͼ��ʾ��ָ��������
     * ����ʹ�����·�����
     * lon ����   lat γ��
     * map.setCenter(new OpenLayers.LonLat(lon, lat)) // �Լ�ָ��lon,lat��ֵ
     * map.zoomTo(5) // �����ͼ���ŵȼ�
     *����
     * map.zoonToExtent(new OpenLayers.Bounds([minX,minY,maxX,maxY)) // ������Ҫ��ʾ������
     */

    // ������ʾ����
    //map.setCenter(new OpenLayers.LonLat(116,39));
    //map.zoomTo(7); // �������ż���

    // ����һ����ʾ�ı߽磬���þ�γ��ȷ��һ�����ν�����ʾ
    map.zoomToExtent(new OpenLayers.Bounds([116,39,130,50]));
}