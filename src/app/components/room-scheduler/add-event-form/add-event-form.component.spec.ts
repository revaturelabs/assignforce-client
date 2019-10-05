import { TestBed, async, ComponentFixture } from "@angular/core/testing"
import { RoomAddEventFormComponent } from "./add-event-form.component"
import { EventControllerService } from "../../../services/api/event-controller/event-controller.service"
import { BatchControllerService } from "../../../services/api/batch-controller/batch-controller.service"
import { MAT_DIALOG_SCROLL_STRATEGY_PROVIDER, MatInputModule, MatDatepickerModule, MatSelectModule, MatOptionModule, MatDialogModule, MatFormFieldModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatNativeDateModule } from "@angular/material"
import { ReactiveFormsModule } from "@angular/forms"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { HttpClient } from "@angular/common/http"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

describe('AddEventFormComponent', ()=>{
    let component: RoomAddEventFormComponent;
    let fixture: ComponentFixture<RoomAddEventFormComponent>;
    class diagStub {
        close() {}
      }
    
      class MatStub {
    
       rooms: ['1','2']
      }
    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations: [ RoomAddEventFormComponent],
            imports: [BrowserAnimationsModule,MatNativeDateModule ,HttpClientTestingModule,MatDialogModule, MatFormFieldModule ,ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatOptionModule],
            providers: [{provide: MatDialogRef, useValues: diagStub}, EventControllerService, BatchControllerService, HttpClient, {provide: MAT_DIALOG_DATA, useClass: MatStub}]
            // MAT_DIALOG_DATA,
        })
        .compileComponents();
    }));

    beforeEach(()=>{
        let http = TestBed.get(HttpClientTestingModule);
        fixture = TestBed.createComponent(RoomAddEventFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('(Sam) should create', ()=>{
        expect(component).toBeTruthy();
    })
})