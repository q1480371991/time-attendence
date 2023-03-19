<template>
    <div>
      <div id="container"></div>
    </div>
  </template>
   
  <script>
    import AMapLoader from '@amap/amap-jsapi-loader';
    window._AMapSecurityConfig = {
    securityJsCode: '63901c213aa414b1de74b90d6fbb04e2',
}
    export default {
      name: "map",
      data() {
        return {
          map: null, //初始化 map 对象
          mycenter:[110.41688104458234, 25.31430556045236],
          five_building:[110.41688104458234, 25.31430556045236],
          five_building1:[[110.41521266599274 , 25.313952000278928],[110.41658595700837, 25.315508621463668],[110.41874245305634, 25.314238109723657],[110.41729942460633, 25.312691170950725]],
          wisdom_valley:[110.40795223892718,25.302758332108066],
          wisdom_valley1:[[110.40387496848679 , 25.306554139288387],[110.41153535743332 , 25.30673842449757],[110.41264042754746, 25.300763561288687],[110.40519461532212, 25.30071506281749]]
        }
      },
      methods: {
        initMap() {
            var that=this
          AMapLoader.load({
            key: "a3eb62e20382e5d9a40dc502d5da9d9e", //此处填入我们注册账号后获取的Key
            version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [''], //需要使用的的插件列表，如比例尺'AMap.Scale'等
          }).then((AMap) => {
            this.map = new AMap.Map("container", { //设置地图容器id
              viewMode: "3D", //是否为3D地图模式
              zoom: 16, //初始化地图级别
              center: this.mycenter, //初始化地图中心点位置
            });
            this.map.plugin(['AMap.MapType','AMap.Scale','AMap.HawkEye','AMap.Geolocation'],()=>{
                this.map.addControl(new AMap.MapType());
                this.map.addControl(new AMap.Scale());
                this.map.addControl(new AMap.HawkEye());

                var geolocation=new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            })
            this.map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,res){
                var pos=res.position
                var circle = new AMap.Circle({
                center: new AMap.LngLat(110.41688104458234, 25.31430556045236),  // 圆心位置
                radius: 120, // 圆半径
                fillColor: 'red',   // 圆形填充颜色
                strokeColor: '#fff', // 描边颜色
                strokeWeight: 2, // 描边宽度
                });
                
                // that.map.add(circle);
                // var currentpoint=pos
                // var center=new AMap.LngLat(110.41688104458234, 25.31430556045236)
                // var isPointInCircle=circle.contains(center)
                // console.log("当前位置是否在圈内:"+isPointInCircle);
                // that.$store.commit('recordposition',pos)
                // console.log(pos.KL);
                // console.log(pos.kT);
                // console.log("callback");
                console.log(status);
                if(status=="complete"){
                  //定位成功
                  // 判断 p 是否在 五教
                  var in_five_building = AMap.GeometryUtil.isPointInRing(pos, that.wisdom_valley1);
                  // 判断 p 是否在 智慧谷
                  var in_wisdom_valley = AMap.GeometryUtil.isPointInRing(pos, that.wisdom_valley1);
                  console.log("p 是否在 五教:"+in_five_building);
                  console.log("p 是否在 智慧谷:"+in_wisdom_valley);
                  that.$store.commit('recordin',[in_five_building,in_wisdom_valley]);
                  if(in_five_building){
                    alert("定位成功：五教")
                  }else if(in_wisdom_valley){
                    alert("定位成功：智慧谷")
                  }else{
                    alert("不在规定区域范围内,刷新页面可重新定位")
                  }
                }else if(status=="error"){
                  //定位失败
                  console.log(res);
                  alert("定位失败,刷新页面可重新定位")
                }
                // console.log(res);
            })
            });
            

            // var circle1 = new AMap.Circle({
            // center: new AMap.LngLat(this.five_building[0],this.five_building[1]),  // 圆心位置
            // radius: 120, // 圆半径
            // fillColor: 'red',   // 圆形填充颜色
            // strokeColor: '#fff', // 描边颜色
            // strokeWeight: 2, // 描边宽度
            // });
            // var circle2 = new AMap.Circle({
            // center: new AMap.LngLat(this.wisdom_valley[0],this.wisdom_valley[1]),  // 圆心位置
            // radius: 150, // 圆半径
            // fillColor: 'red',   // 圆形填充颜色
            // strokeColor: '#fff', // 描边颜色
            // strokeWeight: 2, // 描边宽度
            // });
            // this.map.add(circle1);
            // this.map.add(circle2);
            var polygon1 = new AMap.Polygon({
            path: this.five_building1,
            strokeColor: "#FF33FF", 
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            fillColor: '#1791fc',
            zIndex: 50,
            })
            var polygon2 = new AMap.Polygon({
            path: this.wisdom_valley1,
            strokeColor: "#FF33FF", 
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            fillColor: '#1791fc',
            zIndex: 50,
            })
            this.map.add(polygon1)
            this.map.add(polygon2)
            // 创建一个 Marker 实例：
            var marker1 = new AMap.Marker({
            position: new AMap.LngLat(this.mycenter[0],this.mycenter[1]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '五教'
            });
            var marker2 = new AMap.Marker({
            position: new AMap.LngLat(this.wisdom_valley[0],this.wisdom_valley[1]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '智慧谷'
            });
            this.map.add(marker1);
            this.map.add(marker2);
          }).catch(e => {
            console.log(e);
          })
        },
        
    },
      mounted() {
        //DOM初始化完成进行地图初始化
        this.initMap();
      }
    }
  </script>
   
  <style>
    #container {
      width: 100%;
      height: 870px;
      /* margin: 0px auto; */
    }
  </style>