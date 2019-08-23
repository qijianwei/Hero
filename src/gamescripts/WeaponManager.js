export default class WeaponManager extends Laya.Script{
   constructor(robotWeaponList){
      super();
      this.weaponList=[];
      for(let i=0,len=robotWeaponList.length;i<len;i++){
          let weapon=new PrivateWeapon(robotWeaponList[i]);
          this.weaponList.push(weapon);
      }
   }
   seletedWeapon(index){
      if(index!=undefined){return this.weaponList[index]};
      let weapons=[];
      for(let i=0,len=this.weaponList.length;i<len;i++){
          if(!this.weaponList[i].freezeing){
             console.warn("可用兵器id:",this.weaponList[i].params.weaponName);
             weapons.push(this.weaponList[i])
          }
      }
      let random=Math.floor(Math.random()*weapons.length);
      console.error('选中兵器:......:',weapons[random].params.weaponName)
      return weapons[random];
   }

}
class PrivateWeapon{
    constructor(weaponParams){
      this.params=deepMerge(weaponParams);
      this.freezeing=false;
      this.isSelf=false;
      this.weaponConsume=this.params.weaponConsume;
    }
    
    selectedHandler(){
        if(this.freezeing){
            console.error('机器人兵器冷却中，不可使用');
            return false;
        }
       this.freezeing=true;
       
      
      /*  return this.config; */
    }
    startT(){
        console.error('机器人兵器进行冷却');
        Laya.timer.once(this.params.weaponCd*1000,this,this.changeStatus);
    }
    changeStatus(){
        this.freezeing=false;
    }
}
function deepMerge(...objs) {
    const result = Object.create(null);
    objs.forEach(obj => {
      if (obj) {
        Object.keys(obj).forEach(key => {
          const val = obj[key]
          if (isPlainObject(val)) {
            if (isPlainObject(result[key])) {
              result[key] = deepMerge(result[key], val)
            } else {
              result[key] = deepMerge(val)
            }
          } else {
            result[key] = val
          }
        })
      }
    })
    return result;
}
function isPlainObject(val){
    return Object.prototype.toString.call(val) === '[object Object]'
  }
  