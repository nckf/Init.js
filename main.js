"ui";

showUI();

//显示ui
function showUI() {
    ui.layout(
        <frame>
            <vertical h="auto" align="center" margin="0 50">
                <linear gravity="center">
                    <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}"/>
                </linear>
                <linear gravity="center">
                    <button id="start" text="开始运行"/>
                </linear>
            </vertical>
        </frame>
    );
}

ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if(checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if(!checked && auto.service != null){
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

ui.start.on("click", function(){
    //程序开始运行之前判断无障碍服务
    if(auto.service == null) {
        toastLog("请先开启无障碍服务！");
        return;
    }
    toastLog("正在启动");
    engines.execScriptFile("./auto.js")
});