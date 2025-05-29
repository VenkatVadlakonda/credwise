import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoanService } from '../../../_services/loan.service';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  // @ViewChild('statusChart', { static: true })
  // statusChart!: ElementRef<HTMLDivElement>;
  // @ViewChild('employmentChart', { static: true })
  // employmentChart!: ElementRef<HTMLDivElement>;

  // constructor(private loanService: LoanService) {}

  // ngOnInit() {
  //   this.loadGoogleChartsScript().then(() => {
  //     this.fetchDataAndDrawCharts();
  //   });
  // }

  // loadGoogleChartsScript(): Promise<void> {
  //   return new Promise((resolve) => {
  //     if ((window as any).google && (window as any).google.charts) {
  //       resolve();
  //       return;
  //     }
  //     const script = document.createElement('script');
  //     script.src = 'https://www.gstatic.com/charts/loader.js';
  //     script.onload = () => resolve();
  //     document.head.appendChild(script);
  //   });
  // }

  // fetchDataAndDrawCharts() {
  //   this.loanService.getAllLoans().subscribe((res) => {
      
  //     const data = res;

  //     const statusCounts = data.reduce(
  //       (acc: Record<string, number>, loan: any) => {
  //         acc[loan.status] = (acc[loan.status] || 0) + 1;
  //         return acc;
  //       },
  //       {}
  //     );
      
  //     const employmentCounts = data.reduce(
  //       (acc: Record<string, number>, loan: any) => {
  //         acc[loan.employmentType] = (acc[loan.employmentType] || 0) + 1;
  //         return acc;
  //       },
  //       {}
  //     );

  //     this.drawPieChart(
  //       this.statusChart.nativeElement,
  //       statusCounts,
  //       'Loan Status'
  //     );
  //     this.drawPieChart(
  //       this.employmentChart.nativeElement,
  //       employmentCounts,
  //       'Employment'
  //     );
  //   });
  // }

  // drawPieChart(
  //   element: HTMLElement,
  //   counts: Record<string, number>,
  //   title: string
  // ) {
  //   const google = (window as any).google;
  //   google.charts.load('current', { packages: ['corechart'] });
  //   google.charts.setOnLoadCallback(() => {
  //     const dataArray: (string | number)[][] = [['Category', 'Count']];
  //     for (const key in counts) {
  //       dataArray.push([key, counts[key]]);
  //     }

  //     const data = google.visualization.arrayToDataTable(dataArray);

  //     const options = {
  //       title,
  //       pieHole: 0.4, // donut style, remove if you want classic pie
  //       legend: { position: 'right' },
  //     };

  //     const chart = new google.visualization.PieChart(element);
  //     chart.draw(data, options);
  //   });
  // }
  @ViewChild('statusChart', { static: true }) statusChart!: ElementRef<HTMLDivElement>;
  @ViewChild('loanTypeChart', { static: true }) loanTypeChart!: ElementRef<HTMLDivElement>;

  constructor(private loanService: LoanService) {}

  ngOnInit() {
    this.loadGoogleChartsScript().then(() => {
      this.fetchDataAndDrawCharts();
    });
  }

  loadGoogleChartsScript(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).google && (window as any).google.charts) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  fetchDataAndDrawCharts() {
    this.loanService.getAllLoans().subscribe((data) => {
      const statusCounts = data.reduce((acc: Record<string, number>, loan: any) => {
        acc[loan.status] = (acc[loan.status] || 0) + 1;
        return acc;
      }, {});

      const loanTypeCounts = data.reduce((acc: Record<string, number>, loan: any) => {
        acc[loan.loanType] = (acc[loan.loanType] || 0) + 1;
        return acc;
      }, {});

      this.drawPieChart(this.statusChart.nativeElement, statusCounts, 'Loan Status');
      this.drawPieChart(this.loanTypeChart.nativeElement, loanTypeCounts, 'Loan Types');
    });
  }

  drawPieChart(element: HTMLElement, counts: Record<string, number>, title: string) {
    const google = (window as any).google;
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      const dataArray: (string | number)[][] = [['Category', 'Count']];
      for (const key in counts) {
        dataArray.push([key, counts[key]]);
      }

      const data = google.visualization.arrayToDataTable(dataArray);
      const options = {
        title,
        pieHole: 0.4,
        legend: { position: 'right' },
      };

      const chart = new google.visualization.PieChart(element);
      chart.draw(data, options);
    });
  }
}
