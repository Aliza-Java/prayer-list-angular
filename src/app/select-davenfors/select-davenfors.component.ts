import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Davenfor } from '../shared/models/davenfor.model';
import { DaveningService } from '../shared/services/davening.service';
import { GuestService } from '../guest/guest.service';
import { HttpService } from '../shared/services/http.service';
import { AdminService } from '../admin/admin.service';

@Component({
    selector: 'app-select-davenfors',
    templateUrl: './select-davenfors.component.html',
    styleUrls: ['./select-davenfors.component.css']
})
export class SelectDavenforsComponent implements OnChanges {

    @Input() category: string; //Need this for displaying empty-list

    @Input()
    davenfors: Davenfor[];

    @Input()
    adminPermission: boolean; //Indicating if admin is logged in, sending to http customized url's

    constructor(public guestService: GuestService, public adminService:AdminService) {
    }

    ngOnChanges(): void {
    }

    onEdit(davenfor: Davenfor) {
        alert('onEdit');
    }

    onDelete(davenfor: Davenfor) {
        if (confirm(`Are you sure you want to delete the name ${davenfor.nameHebrew}?`)) {//Get user permission before proceeding
            if (this.adminPermission) { //Sent from admin user
                this.adminService.deleteDavenfor(davenfor.id, davenfor.nameEnglish);
            }
            this.guestService.deleteDavenfor(davenfor.id, davenfor.nameEnglish);
        }
    }

}
