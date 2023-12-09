import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {  MessageService } from './message.service'; 
import { Router } from '@angular/router';

export interface MessageData {
  id: string;
  user_id: string;
  timestamp: any;
  message_body: any;
}


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'user_id', 'timestamp', 'message_body','action'];
  dataSource!: MatTableDataSource<MessageData>;
  messages: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: MessageService,private router:Router) {
  }

  ngOnInit(): void {
    this.service.getData().subscribe((data) => {
      console.log('loading....',typeof data);
      this.messages = data;
      this.dataSource = new MatTableDataSource(this.messages);
      console.log('completely...',this.messages);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateMessage(id: string) {
    this.router.navigate(['/send_message/', id]);
  }
}



