import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
import { BatchControllerService } from '../../services/api/batch-controller/batch-controller.service';
import { Batch } from '../../model/Batch';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { Curriculum } from '../../model/Curriculum';
import { SettingControllerService } from '../../services/api/setting-controller/setting-controller.service';
import { Setting } from '../../model/Setting';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  allBatches: Batch[];
  curricula: Curriculum[];
  reports: Report[];
  reports3: Report[];
  currentYear: number;
  coreCurriculumNames: {id: number, name: string}[] = [];
  settings: Setting;
  mappedBatchData: any[];

  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dataSource = new MatTableDataSource(this.reports);
  dataSource2 = new MatTableDataSource(this.reports3);

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild('traineeChartThisYear')
  traineeChartThisYear: ElementRef;
  @ViewChild('traineeChartNextYear')
  traineeChartNextYear: ElementRef;

  chart1: Highcharts.ChartObject;
  chart2: Highcharts.ChartObject;

  options = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true,
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Graduates',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} trainees</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      x: 0,
      y: 0,
      floating: false,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Java',
        data: [0, 22, 0, 0, 22, 44, 0, 0, 0]
      },
      {
        name: '.NET',
        data: [0, 0, 0, 22, 44, 110, 22, 22, 0]
      },
      {
        name: 'SDET',
        data: [110, 66, 110, 66, 66, 22, 176, 220, 198]
      },
      {
        name: 'Custom',
        data: [0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  };

  constructor(private batchService: BatchControllerService, 
    private curriculumService: CurriculumControllerService,
    private settingsService: SettingControllerService
  ) {}

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.settingsService.find()
      .subscribe((settings) => {
        this.settings = settings;
        this.curriculumService.findAll().subscribe(curricula => {
          this.curricula = curricula;
          this.coreCurriculumNames = this.curricula
            .filter((curriculum) => curriculum.isCore && curriculum.isActive)
            .map((curriculum) => {
              return {id: curriculum.id, name: curriculum.name}
            });
    
          this.batchService.findAll().subscribe(batches => {
            this.allBatches = batches
            this.allBatches.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
            this.mappedBatchData = this.mapBatches();
            this.processIncomingChart();
            this.processOutgoingChart();
          });
          
        });
      });
  }

  processOutgoingChart() {
    const myBatchData = [];
    for(let i = 0; i < this.mappedBatchData.length; i++) {
      myBatchData[i] = this.mappedBatchData[i].filter((batch) => new Date(batch.endDate).getFullYear() === this.currentYear);
    }

    const reports = [];
    //create an array of objects {name, data[]}
    this.coreCurriculumNames.forEach((core) => {
      const report: Report = {
        name: core.name,
        data: []
      };
      myBatchData.forEach((batchesForMonth) => {
        let total = 0;
        batchesForMonth.forEach((batch) => {
          if(batch.curriculum !== core.id) return;
          total += this.settings.reportGrads;
        });
        report.data.push(total);
      });
      reports.push(report);
    });

    this.reports = reports;
    this.options.series = reports;
    this.chart1 = chart(this.traineeChartThisYear.nativeElement, this.options)
  }

  processIncomingChart() {
    const myBatchData = []
    for(let i = 0; i < this.mappedBatchData.length; i++) {
      myBatchData[i] = this.mappedBatchData[i].filter((batch) => new Date(batch.startDate).getFullYear() === this.currentYear);
    }

    const reports = [];
    //create an array of objects {name, data[]}
    this.coreCurriculumNames.forEach((core) => {
      const report: Report = {
        name: core.name,
        data: []
      };
      myBatchData.forEach((batchesForMonth) => {
        let total = 0;
        batchesForMonth.forEach((batch) => {
          if(batch.curriculum !== core.id) return;
          total += this.settings.reportIncomingGrads;
        });
        report.data.push(total);
      });
      reports.push(report);
    });

    this.reports3 = reports;
    this.options.series = reports;
    this.chart1 = chart(this.traineeChartNextYear.nativeElement, this.options)
  }

  mapBatches(): any[] {
    const mapByMonth = [];
    for(let i = 0; i < 12; i++) {
      for(let j = 0; j < this.allBatches.length; j++) {
        if(!mapByMonth[i]) {
          mapByMonth[i] = []
        }
        const d = new Date(this.allBatches[j].startDate);
        if(d.getMonth() === i) {
          mapByMonth[i].push(this.allBatches[j]);
        }
      }
    }
    return mapByMonth
  }
}

export interface Report {
  name: string;
  data: number[];
}
