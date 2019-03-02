export default {
    data(){
        return {devMode:false};
    },
    methods:{
        log(info,tag){
            if(this.devMode){
                console.log(info,this.$options.name);
            }
            
        }
    }
};