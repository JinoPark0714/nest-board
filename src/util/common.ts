export const common = {
  isSuccess : function(affectedRows : number) : boolean{
    if(affectedRows == 1)
      return true;
    return false;
  }
};