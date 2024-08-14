import { Component, OnInit } from '@angular/core';
import { FormsGroupService } from 'src/app/services/group/formsgroup.service';
import { FormsGroup } from 'src/app/interfaces/forms-group';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit{

  formsGroups: FormsGroup[] = [];

  constructor(private formsGroupService: FormsGroupService) { }

  ngOnInit(): void {
    this.formsGroupService.GetFormsGroups().subscribe((data) => {
      this.formsGroups = data;
    });
  }

  showOptions(){
    
  }
}
