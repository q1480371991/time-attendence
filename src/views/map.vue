/* 
    车辆轨迹
 */
<template>
    <div class="main">
        <section class="section">
                <!-- 地图 -->
                <div id="container" style="width:100%;height:100%" />

                <!-- 控制按钮组 -->
                <div class="ebox">
                    <el-button-group>
                        <el-button type="info" icon="el-icon-circle-plus-outline" @click="drawRectangle">绘制围栏</el-button>
                        <el-button type="primary" icon="el-icon-edit" @click="editRectangle">编辑围栏</el-button>
                        <el-button type="warning" icon="el-icon-delete" @click="cancelRectangle">取消编辑</el-button>
                        <el-button type="success" icon="el-icon-success" @click="saveRectangle">保存围栏</el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="deleRectangle">删除围栏</el-button>
                    </el-button-group>
                </div>
        </section>
    </div>
</template>

<script>
import { geofenceList } from '@/api/manage/fenceAPI.js' //获取围栏数据

export default {
    name: 'dashboard',
    data() {
        return {
            formData: {
                carId: '',
                pageNum: 1,//当前页
                pageSize: 10,//页长
                pageTotal: 0,//总数
            },
            
            map: null,
            centerArr: [113.760234, 23.048884],//地图中心位置，不能为空数组【为空数组会报错】
            path: [],//以前绘制的数据
            paths: [], // 当前绘制的多边形经纬度数组
            polygonItem: [], // 地图上绘制的所有多边形对象
            polyEditors: [],// 新增数据=>所有编辑对象数组
            polyEditorsBefore: [],// 以前历史数据=>进入编辑对象数组
        }
    },
    created() {
        this.init()
    },
    mounted() {
        setTimeout(() => {//异步加载（否则报错initMap is not defined）
            this.initMap() 
        }, 1000)
    },
    methods: {
        // 地图初始化
        initMap() {
            this.map = new AMap.Map('container', {
                resizeEnable: true, // 窗口大小调整
                center: this.centerArr, // 中心
                zoom: 15,//放大级别
                showLabel: true, // 是否显示地图文字标记
            })
            // 添加工具栏
            this.map.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
                const toolbar = new AMap.ToolBar()// 工具条
                const scale = new AMap.Scale()// 比例尺
                this.map.addControl(toolbar)
                this.map.addControl(scale)
            })
        },
        // 绘制多边形
        drawRectangle() {
            const This = this;
            let mouseTool = new AMap.MouseTool(this.map);
            const polygon = mouseTool.polygon({
            //polygon：绘制多边形【线段：polyline;矩形：rectangle;圆：circle】
                strokeColor: 'red',
                strokeOpacity: 0.4,
                strokeWeight: 6,
                fillColor: '#1791fc',
                fillOpacity: 0.2,
                // strokeStyle还支持 solid
                strokeStyle: 'solid',
                // strokeDasharray: [30,10],
            });
            mouseTool.on('draw', function (event) {
                // event.obj 为绘制出来的覆盖物对象
                let polygonItem = event.obj;
                let paths = polygonItem.getPath();//取得绘制的多边形的每一个点坐标
                // console.log('覆盖物对象绘制完成各个点的坐标', paths, event);

                let path = [];  // 编辑的路径
                paths.forEach(v => {
                    path.push([v.lng, v.lat])
                });
                This.paths = path //将新增数据放入paths数组里
                // This.editRectangle();//绘制完成,默认进入编辑状态
                This.polygonItem.push(event.obj);
                // This.map.remove(event.obj); // 删除多边形
                // console.log(polygon, '------polygon-----');
            });
        },
        // 编辑围栏
        editRectangle() {
            const path = this.paths;
			//新增的进入编辑状态
            let polygon = new AMap.Polygon({
                path: path,
                strokeColor: "#FF33FF",
                strokeWeight: 6,
                strokeOpacity: 0.2,
                fillOpacity: 0.2,
                fillColor: '#1791fc',
                zIndex: 50,
            });
            this.map.add(polygon);
            this.polygonItem.push(polygon);
            // 缩放地图到合适的视野级别
            this.map.setFitView([polygon]);

            this.polyEditor = new AMap.PolyEditor(this.map, polygon);
            this.polyEditor.open();
            this.polyEditors.push(this.polyEditor);

			//历史围栏的进入编辑状态
            let polygonBefore = new AMap.Polygon({
                path: this.path,
                strokeColor: "#FF33FF",
                strokeWeight: 6,
                strokeOpacity: 0.2,
                fillOpacity: 0.2,
                fillColor: '#1791fc',
                zIndex: 50,
            });
            this.map.add(polygonBefore);
            this.polygonItem.push(polygonBefore);
            // 缩放地图到合适的视野级别
            this.map.setFitView([polygonBefore]);

            this.polyEditorBefore = new AMap.PolyEditor(this.map, polygonBefore);
            this.polyEditorBefore.open();
            this.polyEditorsBefore.push(this.polyEditorBefore);

            // this.polyEditor.on('addnode', function (event) {
            //     console.info('触发事件：addnode', event)
            //     console.info('修改后的经纬度：', polygon.getPath())
            // });

            // this.polyEditor.on('adjust', function (event) {
            //     console.info('触发事件：adjust', event)
            //     console.info('修改后的经纬度：', polygon.getPath())
            // });

            // this.polyEditor.on('removenode', function (event) {
            //     console.info('触发事件：removenode', event)
            //     console.info('修改后的经纬度：', polygon.getPath())
            // });

            // this.polyEditor.on('end', function (event) {
            //     console.info('触发事件： end', event)
            //     console.info('end修改后的经纬度：', polygon.getPath())
            //     // event.target 即为编辑后的多边形对象
            // });
        },
        // 取消编辑状态
        cancelRectangle() {
            this.polyEditors.forEach(item => { item.close(); });//新增
            this.polyEditorsBefore.forEach(item => { item.close(); });//历史
        },
        //保存围栏
        saveRectangle() {
   			// 取消编辑状态
            this.polyEditors.forEach(item => { item.close(); });
            this.polyEditorsBefore.forEach(item => { item.close(); });
			// 保存  console.log(this.paths,this.path)=>成功（重新刷新页面）
			...
        },
        // 删除围栏
        deleRectangle() {
            this.polyEditors.forEach(item => { item.close(); });// 取消编辑状态
            this.polyEditorsBefore.forEach(item => { item.close(); });// 取消编辑状态
            this.map.clearMap(); // 删除地图所有覆盖物
            //删除=>成功（重新刷新页面）
            ...
        },
        //获取后台数据
        init() {
            const that = this
            let param = {
                carId: this.formData.carId,//string true carID
                pageNum: this.formData.pageNum,//string false 当前页数
                pageSize: this.formData.pageSize,//string false 每页条数
            }
            geofenceList({ param }).then(res => {
                if (res.data.code == 0) {
                    if (res.data.data.list.length==0) {
                        this.$message.error('没有围栏数据')
                        return
                    }
                    that.path=[]
                    that.map.clearMap(); // 删除地图所有覆盖物
                    res.data.data.list.forEach((item, index) => { //同时展示多个围栏
                        that.path.push(item.points)//编辑时，可以一起编辑
                        // this.centerArr = that.path[0]
                        // this.initMap()

                        that.map.add(new AMap.Polygon({
                            path: item.points,
                            strokeColor: "#FF33FF",
                            strokeWeight: 6,
                            strokeOpacity: 0.2,
                            fillOpacity: 0.4,
                            fillColor: "#1791fc",
                            zIndex: 50,
                        }));
                        that.map.setFitView();
                   })
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
    }
};
</script>


<style scoped lang="scss">
	@import url("https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css");
</style>
