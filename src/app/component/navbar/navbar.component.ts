import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  roles: any;
  menuItems: any[] = [];
  nestedMenu: any[] = [];
  isPopoverVisible: boolean = false;

  


  constructor(private authservice: AuthserviceService) {
  }

  ngOnInit(): void {

    this.roles = localStorage.getItem('roles');
    console.log('roles', this.roles);
    this.getmenufromapi();
  }

  togglePopover(): void {
    this.isPopoverVisible = !this.isPopoverVisible;
  }

  getmenufromapi() {
    this.authservice.getmenu(this.roles)
    .subscribe((result)=>{
      this.menuItems=result;
      console.log('menuresults',this.menuItems);
      this.nestedMenu = this.buildMenu(this.menuItems);
      console.log('nestedMenu',this.nestedMenu);

    })
  }
  
  buildMenu(menuItems: any[]): any[] {
    const menuMap = new Map();

    // Map all items by menuId
    menuItems.forEach((item) => menuMap.set(item.menuId, { ...item, children: [] }));
    console.log('menuMap',menuMap);
    const nestedMenu: any[] = [];

    // Link parents with their children
    menuItems.forEach((item) => {
      if (item.menuId !== item.parentId) {
        const parent = menuMap.get(item.parentId);
        if (parent) {
          parent.children.push(menuMap.get(item.menuId));
        }
      } else {
        nestedMenu.push(menuMap.get(item.menuId));
      }
    });

    return nestedMenu;
  }
}
