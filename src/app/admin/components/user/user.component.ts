import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['username', 'email', 'role', 'actions'];
  roles: any[] = ['admin', 'user'];
  dataSource;
  form: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('formulario') formulario;
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      _id: undefined,
      username: [''],
      email: [''],
      role: [''],
      password: [''],
    });
    this.adminService.readUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      console.log(res);
    });
  }
  openDialog(row): void {
    this.form.patchValue(row);
    const dialogRef = this.dialog.open(this.formulario, {
      width: '80vw',
      //   data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      //    this.animal = result;
    });
  }

  save() {
    this.adminService.saveUser(this.form.value).subscribe((res) => {
      console.log(res);
    });
  }
}
