export class SidebarListControler {
  constructor(
    public expandSidebarlist = false
  ){}

  public toggleSidebarList(event){
    this.expandSidebarlist = event;
  }

}
