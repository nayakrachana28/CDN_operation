import { Component, OnInit } from '@angular/core';
import { FormArrayName, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountModel } from '../models/account-model';
import { ApiService } from '../services1/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //formValue!:FormGroup;
  accountModelobj: AccountModel = new AccountModel();
  accountData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;

  //form validation
    /*formValue:FormGroup|any;
    name:FormControl|any;
    email:FormControl|any;
    mobile:FormControl|any;
    status:FormControl|any;*/

    //Form validation
    formValue:FormGroup=new FormGroup({
      name:new FormControl(''),
      email:new FormControl(''),
      mobile:new FormControl(''),
      status:new FormControl('')
    })
  

  submitted=false;
  constructor(private formbuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    /*this.name=new FormControl('',[Validators.required]);
    this.email=new FormControl('',[Validators.required]);
    this.mobile=new FormControl('',[Validators.required]);
    this.status=new FormControl('',[Validators.required]);
    this.formValue=new FormGroup(
      {
        'name':this.name,
        'email':this.name,
        'mobile':this.name,
        'status':this.name
      }
    )*/

      this.formValue=this.formbuilder.group(
        {
          name:['',[Validators.required,Validators.minLength(16)]],
          email:['',Validators.required],
          mobile:['',Validators.required],
          status:['',Validators.required]
        }
      );

    this.getproduct();
  }

  get f(){return this.formValue.controls;}

  clickAddproduct(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postproductDetails(){
    this.submitted=true;
    if(this.formValue.invalid){
      return;
    }
    this.accountModelobj.name=this.formValue.value.name;
    this.accountModelobj.email=this.formValue.value.email;
    this.accountModelobj.mobile=this.formValue.value.mobile;
    this.accountModelobj.status=this.formValue.value.status;

    this.api.postproduct(this.accountModelobj).subscribe(result=>{
      console.log(result);
      alert("New account added Sucefully!!!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getproduct();
    },
    err=>{
      alert("Something went wrong......")
    })
  }

  getproduct(){
    this.api.getproduct().subscribe(result=>{
      this.accountData=result;
    },
    err=>{

    })
  }

  deleteproduct(account:any){
    this.api.deleteproduct(account.id).subscribe(res=>{
      alert("The Product deleted!!!!")
      this.getproduct();
    }),
    ({

    })
  }

  onEdit(account: any){
    this.showAdd=false;
    this.showUpdate=true;
    this.accountModelobj.id=account.id;
    this.formValue.controls['name'].setValue(account.name);
    this.formValue.controls['email'].setValue(account.email);
    this.formValue.controls['mobile'].setValue(account.mobile);
    this.formValue.controls['status'].setValue(account.status);
  }

  updateproductdetails(){
    this.accountModelobj.name=this.formValue.value.name;
    this.accountModelobj.email=this.formValue.value.email;
    this.accountModelobj.mobile=this.formValue.value.mobile;
    this.accountModelobj.status=this.formValue.value.status;

    this.api.updateproduct(this.accountModelobj,this.accountModelobj.id).subscribe(result=>{
      alert("The account update!")

      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getproduct();
    })
  }



}
