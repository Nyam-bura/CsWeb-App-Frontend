import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from '../message.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reply-message',
  templateUrl: './reply-message.component.html',
  styleUrls: ['./reply-message.component.css']
})
export class ReplyMessageComponent implements OnInit {

  editMessageForm!:FormGroup;
  editid!:string;
  loading:boolean=false;
  constructor(private formBuilder: FormBuilder,
    private api: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.editMessageForm = this.formBuilder.group({
      user_id: [''],
      timestamp: [''],
      message_body: [''],
      reply:['']

    });
    const current_route: boolean = this.router.url?.includes('http://localhost:4200/send_message');
    console.log('current outee',current_route);
    this.editid = this.route.snapshot.params['id'];

    console.log('edit is',this.editid);

    if (current_route == true) {
      this.populate_edit_fields(this.editid);
    }
  }
  populate_edit_fields(id: string) {
    this.loading = false;
    this.api.getMessageById(this.editid).subscribe({
      next: (data: any) => {
        const messageData: any = data;
        this.editMessageForm.setValue({
          user_id: messageData.user_id??'',
          timestamp: messageData.timestamp ?? '',
          message_body: messageData.message_body ?? '',
          reply:''
        });
      },
      error: (error) => {
        this.loading = false;

        switch (error.status) {
          case 401:
            break;
            
        }
      },
      complete: () => {
        this.loading = false;
        
      },
    });
  }

  submit() {
    var updateData = {
      user_id: this.editMessageForm.value.user_id,
      message_body: this.editMessageForm.value.message_body,
      reply: this.editMessageForm.value.reply
    };
    
      this.api.sendMessage(updateData).subscribe({
        next: (data: any) => {},
        error: (err: any) => {
          this.loading = false;

          switch (err.status) {
            case 401:
              break;
            default:
              
              break;
          }
        },
        complete: () => {
          
        },
      });
    }
  
}
