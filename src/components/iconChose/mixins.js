
export default {
    props:{
        dialogVisible:{
            type:Boolean,
            default:false,
        }
    },
   
  methods:{
      click:function(event){
          let iconName="";
            if(event.target.tagName!="UI")
            {//选中的是某个li节点
           let oldtarget= document.querySelector("li.red");
              oldtarget&&(oldtarget. className="");

                switch (event.target.tagName) {
                    case "LI":
                       iconName=event.target.children[2].innerText.replace(".",""); 
                       event.target.className+=" red";
                     
                        break;
                
                    default:
                    //子节点,返回父节点
                     iconName=event.target.parentElement.children[2].innerText.replace(".",""); 
                            event.target.parentElement.className+=" red";
                    
                        break;
                }
                this.iconName=iconName;
              
            }
            
      },
      cancel(){
        this.$emit("cancel");//回传组件
      },
      ok(){
        
                   
            this.$emit("ok"," iconfont "+this.iconName);//回传组件
      }
  }
}