import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsErreur } from 'src/app/model/class/LogsErreur';
import { LogsService } from 'src/app/services/logs/logs.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {

  logsList : LogsErreur[] =[];
  searchQuery: string = '';
  filteredLogs: LogsErreur[] = []; 


  logsService = inject(LogsService);

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs() {
    this.logsService.getAllLogs().subscribe({
      next: (res: LogsErreur[]) => {
        this.logsList = res;
        this.filteredLogs = res;
        console.log('**Filtered list:', this.filteredLogs);
      },
      error: (error) => {
        console.error('Error fetching logs', error);
      }
    });
  }
  

  onSearch(): void {
    if (this.searchQuery) {
      this.filteredLogs = this.logsList.filter(log =>
        log.message.toLocaleLowerCase().includes(this.searchQuery.toLowerCase()) 
      );
    } else {
      this.filteredLogs = [...this.filteredLogs];  
    }
    console.log('Filtered list:', this.filteredLogs);

  }


}
