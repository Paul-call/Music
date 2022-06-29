function remSize(){
    let deviceWidth:number=window.innerWidth ;
    let deviceHeight:number=window.innerHeight ;
    if(deviceWidth>=675){
        deviceWidth=675;
    }
    if(deviceWidth<=320){
        deviceWidth=320;
    }
    
    document.documentElement.style.fontSize=(deviceWidth/7.5)+"px"
    //设置字体大小
    document.body.style.fontSize=0.16+"rem"
}
remSize()
//当app大小改变时 重新调用函数
window.onresize=()=>{
    remSize()
}