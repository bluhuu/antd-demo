    //导出Excel
function exportExcel(params,columns,url){
    let cols = [...columns];
    //---shim---
    for (let i=cols.length-1;i>=0;i--){
        if(cols[i].dataIndex){
            cols[i].id=cols[i].dataIndex;
            cols[i].name=cols[i].title;
        }else{
            console.log("exportExcel--for--else--");
        }
    }
    //---
    params.columns=JSON.stringify(cols);
    params.title = "折扣管理";
    var _self = this;
    this.setState({loading: true});
    $.ajax({
        url: "/elink_scm_web/promotionAction/promotionListExport.do",
        data: params,
        dataType: "json",
        success: function(result) {
            _self.setState({
                loading: false,
            });
            downloadFile("/elink_scm_web/appAction/downfile.do?targetFile="+result.file);
        },
        error: function(){
            console.log("出错：获取表单数据失败！ about: ",url);
        },
    });
}
export default exportExcel;
