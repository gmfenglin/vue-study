const path=require("path");
const ROOT_PATH=path.resolve(__dirname,"../");
const webpack=require("webpack");
module.exports={
    mode:"development",
    entry:{
       vue:['vue','vue-router','vuex'] 
    },
    output:{
        filename:'_dll_[name].js',
        path:path.resolve(ROOT_PATH,"dist"),
		library:'_dll_[name]'
    },
    plugins:[
        new webpack.DllPlugin({
            name:'_dll_[name]',
            path:path.resolve(ROOT_PATH,"dist","manifest.json")
        })
    ]
}